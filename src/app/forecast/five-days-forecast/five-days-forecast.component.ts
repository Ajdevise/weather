import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.scss']
})
export class FiveDaysForecastComponent implements OnInit {
  fiveDaysForecast: Array<any>;

  constructor(private weatherApi: WeatherApiService) { }

  ngOnInit() {
    this.fiveDaysForecast = this.weatherApi.getForecastData().splice(1);
  }

}
