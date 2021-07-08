import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-weather-today',
  templateUrl: './weather-today.component.html',
  styleUrls: ['./weather-today.component.scss']
})
export class WeatherTodayComponent implements OnInit {
  weather: any;

  constructor(private weatherApi: WeatherApiService) { }

  ngOnInit() {
    // Check maybe if this component will be initialised after the request has done its job, or it isn't neccessary because it will be loading with http interceptor technique
    // this.weatherApi.fetchForecastData().subscribe(data => {
    //   this.weather = data[0];
    //   console.log(this.weather);
    // })
  }
}
