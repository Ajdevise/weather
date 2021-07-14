import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodaysHighlightsComponent } from './forecast/todays-highlights/todays-highlights.component';
import { FiveDaysForecastComponent } from './forecast/five-days-forecast/five-days-forecast.component';
import { ForecastCardComponent } from './forecast/five-days-forecast/forecast-card/forecast-card.component';
import { WeatherTodayComponent } from './forecast/weather-today/weather-today.component';
import { SearchComponent } from './forecast/search/search.component';
import { HttpRequestInterceptor } from './interceptors/http-request-interceptor';
import { JoinPipe } from './pipes/join.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodaysHighlightsComponent,
    FiveDaysForecastComponent,
    ForecastCardComponent,
    WeatherTodayComponent,
    SearchComponent,
    JoinPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
