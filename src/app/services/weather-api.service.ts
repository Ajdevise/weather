import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private endpoint: string = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";

  constructor(private http: HttpClient) { }

  async findWoeid(locationName: string): Promise<number> {
    const response = await this.http.get<{woeid: number}>(`${this.endpoint}search/?query=${locationName}`).toPromise();
    return response.woeid;
  }

  async getForecastInfoByWoeid(woeid: number): Promise<Array<any>> {
    return await this.http.get<Array<any>>(this.endpoint + woeid).toPromise();
  }
}
