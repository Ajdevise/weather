import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from './services/weather-api.service';
import { RouterOutlet } from '@angular/router';
import { fader } from './animations/route.animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {
  title = 'weather-app';

  constructor(private weatherApi: WeatherApiService) {}

  ngOnInit() {
    // If localStorage is not set then ...
    // this.weatherApi.getForecastData("Athens");
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
