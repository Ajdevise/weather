import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {
  weather: any;
  location: string;

  constructor(private weatherApi: WeatherApiService) { }

  ngOnInit() {
    this.weather = this.weatherApi.getForecastData()[0];
    this.location = this.weatherApi.getLocation();
    console.log(this.weather);
  }
}
