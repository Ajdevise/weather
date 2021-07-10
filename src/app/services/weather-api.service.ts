import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  temperatureUnit: Subject<string> = new Subject<string>();
  private endpoint: string = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/";
  private forecastData: any;

  constructor(private http: HttpClient) { }

  getLocation(): string {
    return localStorage.getItem('location');
  }

  setTemperatureUnit(unit: 'F' | 'C'): void {
    this.temperatureUnit.next(unit);
    localStorage.setItem('unit', unit);
  }

  getForecastData(): Array<any> {
    return JSON.parse(JSON.stringify(this.forecastData));
  }

  async fetchForecastDataByCoordinates(latt: number, long: number): Promise<Array<any>> {
    const woeid = await this.findWoeidByCoordinates(latt, long);
    return await this.fetchForecastData(woeid);
  }

  async fetchForecastDataByLocationName(locationName: string) {
    const woeid = await this.findWoeidByLocationName(locationName);
    return await this.fetchForecastData(woeid);
  }

  private async fetchForecastData(woeid: number): Promise<Array<any>> {
    const forecastData = await this.getForecastDataByWoeid(woeid);
    this.forecastData = forecastData;
    return forecastData;
  }

  private setLocation(locationName: string) {
    localStorage.setItem('location', locationName);
  }

  private async findWoeidByCoordinates(latt: number, long: number) {
    const response = await this.http.get<{woeid: number}>(`${this.endpoint}search/?lattlong=${latt},${long}`).toPromise();
    this.setLocation(response[0].title);
    return response[0].woeid;
  }

  private async findWoeidByLocationName(locationName: string): Promise<number> {
    const response = await this.http.get<{woeid: number}>(`${this.endpoint}search/?query=${locationName}`).toPromise();
    this.setLocation(response[0].title);
    return response[0].woeid;
  }

  private async getForecastDataByWoeid(woeid: number): Promise<Array<any>> {
    const response = await this.http.get<any>(this.endpoint + woeid).toPromise();
    return response.consolidated_weather;
  }
}
