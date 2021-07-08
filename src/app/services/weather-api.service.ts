import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private endpoint: string = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";
  private forecastData: any;

  constructor(private http: HttpClient) { }

  getLocation(): string {
    return localStorage.getItem('location');
  }

  getForecastData(): Array<any> {
    return this.forecastData;
  }

  async fetchForecastData(locationName: string): Promise<Array<any>> {
    const woeid = await this.findWoeid(locationName);
    const forecastData = await this.getForecastDataByWoeid(woeid);

    localStorage.setItem('location', locationName);
    this.forecastData = forecastData;
    return forecastData;
  }

  private async findWoeid(locationName: string): Promise<number> {
    const response = await this.http.get<{woeid: number}>(`${this.endpoint}search/?query=${locationName}`).toPromise();
    return response[0].woeid;
  }

  private async getForecastDataByWoeid(woeid: number): Promise<Array<any>> {
    const response = await this.http.get<any>(this.endpoint + woeid).toPromise();
    return response.consolidated_weather;
  }
}
