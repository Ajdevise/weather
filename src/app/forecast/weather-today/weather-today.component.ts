import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {
  unit: string = localStorage.getItem('unit') || 'C';
  weather: any;
  location: string;

  constructor(private weatherApi: WeatherApiService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.weatherApi.temperatureUnit.subscribe(unit => {
      this.unit = unit;
    })
    
    this.weather = this.weatherApi.getForecastData()[0];
    this.location = this.weatherApi.getLocation();
  }

  async getUserLocationWeatherData() {
    try {
      this.loadingService.setLoading(true, 'geolocation');
      await this.weatherApi.fetchUserLocationWeatherData();
    } catch(e) {
      alert("Location Access Denied");
    } finally {
      this.loadingService.setLoading(false, 'geolocation');
    }
  }
}
