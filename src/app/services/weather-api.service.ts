import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private fetchedData: Subject<any> = new Subject<Array<any>>();
  private endpoint: string = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";

  constructor(private http: HttpClient) { }

  fetchForecastData(): Subject<Array<any>> {
    return this.fetchedData;
  }

  async getForecastData(locationName: string): Promise<void> {
    const woeid = await this.findWoeid(locationName);
    const forecastData = await this.getForecastDataByWoeid(woeid);

    this.fetchedData.next(forecastData);
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
