import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './services/weather-api.service';
import { RouterOutlet } from '@angular/router';
import { fader } from './animations/route.animations';
import { LoadingService } from './services/loading.service';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {
  loading: boolean = false;

  constructor(private weatherApi: WeatherApiService, private loadingService: LoadingService) {}

  ngOnInit() {
    // If localStorage is not set then ...
    this.listenToLoading();
    this.weatherApi.getForecastData("Athens");
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  listenToLoading(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe((loading) => {
      this.loading = loading;
      console.log(loading);
    })
  }
}
