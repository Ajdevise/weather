import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-todays-highlights',
  templateUrl: './todays-highlights.component.html',
  styleUrls: ['./todays-highlights.component.scss']
})
export class TodaysHighlightsComponent implements OnInit {
  weather: any;

  constructor(private weatherApi: WeatherApiService) { }

  ngOnInit() {
    this.weather = this.weatherApi.getForecastData()[0];
  }

}
