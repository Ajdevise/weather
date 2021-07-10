import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {
  weather: any;
  location: string;

  constructor(private weatherApi: WeatherApiService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.weather = this.weatherApi.getForecastData()[0];
    this.location = this.weatherApi.getLocation();
  }

  async getUserLocationWeatherData() {
    try {
      this.loadingService.setLoading(true, 'geolocation');
      const coordinates = await this.getUserLocationCoordinates();
      await this.weatherApi.fetchForecastDataByCoordinates(coordinates.latt, coordinates.long);
    } catch(e) {
      alert("Location access denied");
    } finally {
      this.loadingService.setLoading(false, 'geolocation');
    }
  }

  getUserLocationCoordinates(): Promise<{latt: number, long: number}> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(response => resolve({ latt: response.coords.latitude, long: response.coords.longitude }), err => reject(err));
    })
  }
}
