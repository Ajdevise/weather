import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './services/weather-api.service';
import { RouterOutlet } from '@angular/router';
import { fader } from './animations/route.animations';
import { LoadingService } from './services/loading.service';
import { delay } from 'rxjs/operators';
import { City } from './model/city.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {
  unit: string = localStorage.getItem("unit") || 'C';
  loading: boolean = true;
  location: City = {
    name: localStorage.getItem('location') || 'Athens',
    latt: parseFloat(localStorage.getItem('latt')) || 37.98,
    long: parseFloat(localStorage.getItem('long')) || 23.72
  }

  constructor(private weatherApi: WeatherApiService, private loadingService: LoadingService) {}

  async ngOnInit() {
    console.log("Built by Ajdevise");
    this.listenToLoading();
    await this.appInitialization();
  }

  async appInitialization() {
    try {
      this.loadingService.setLoading(true, 'geolocation');
      await this.weatherApi.fetchUserLocationWeatherData();
    } catch(e) {
      alert("Location Access Denied");
      await this.weatherApi.fetchForecastDataByCoordinates(this.location.latt, this.location.long);
    } finally {
      this.loadingService.setLoading(false, 'geolocation');
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  listenToLoading(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
    })
  }

  setTemperatureUnit(unit: 'C' | 'F') {
    this.unit = unit;
    this.weatherApi.setTemperatureUnit(unit);
  }
}
