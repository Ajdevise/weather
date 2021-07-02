import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodaysHighlightsComponent } from './forecast/todays-highlights/todays-highlights.component';
import { FiveDaysForecastComponent } from './forecast/five-days-forecast/five-days-forecast.component';
import { ForecastCardComponent } from './forecast/five-days-forecast/forecast-card/forecast-card.component';
import { WeatherTodayComponent } from './forecast/weather-today/weather-today.component';

@NgModule({
  declarations: [
    AppComponent,
    TodaysHighlightsComponent,
    FiveDaysForecastComponent,
    ForecastCardComponent,
    WeatherTodayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
