import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss']
})
export class ForecastCardComponent implements OnInit {
  unit: string = localStorage.getItem('unit') || 'C';
  @Input() index: number;
  @Input() forecast: any;
  @HostBinding("style.animationDelay") animationDelay: string;

  constructor(private weatherApi: WeatherApiService) { }

  ngOnInit() {
    this.weatherApi.temperatureUnit.subscribe(unit => {
      this.unit = unit;
    })

    this.animationDelay = this.index * 0.15 + "s";
  }
}
