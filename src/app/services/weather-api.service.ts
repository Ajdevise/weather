import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  temperatureUnit: Subject<string> = new Subject<string>();
  private endpoint: string = `https://api.allorigins.win/get?url=${encodeURIComponent("https://www.metaweather.com/api/location")}`;
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

  async fetchCities(query: string): Promise<Array<any>> {
    let response = await this.http.get<{contents: string}>(`${this.endpoint}/search/?query=${query}`).toPromise();
    let cities = JSON.parse(response.contents);
    return cities;
  }

  async fetchForecastDataByCoordinates(latt: number, long: number) {
    const woeid = await this.findWoeidByCoordinates(latt, long);
    return await this.fetchForecastData(woeid);
  }

  async fetchUserLocationWeatherData() {
    const coordinates = await this.getUserLocationCoordinates();
    await this.fetchForecastDataByCoordinates(coordinates.latt, coordinates.long);
  }

  private async getUserLocationCoordinates(): Promise<{latt: number, long: number}> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(response => resolve({ latt: response.coords.latitude, long: response.coords.longitude }), err => reject(err));
    })
  }

  private async fetchForecastData(woeid: number): Promise<Array<any>> {
    const forecastData = await this.getForecastDataByWoeid(woeid);
    this.forecastData = forecastData;
    return forecastData;
  }

  private setLocation(locationName: string) {
    localStorage.setItem('location', locationName);
  }

  private setCoordinates(latt: number, long: number) {
    localStorage.setItem('latt', latt.toString());
    localStorage.setItem('long', long.toString());
  }

  private async findWoeidByCoordinates(latt: number, long: number) {
    let response = await this.http.get<{contents: string}>(`${this.endpoint}/search/?lattlong=${latt},${long}`).toPromise();
    response = JSON.parse(response.contents);
    this.setLocation(response[0].title);
    this.setCoordinates(latt, long);
    return response[0].woeid;
  }

  private async getForecastDataByWoeid(woeid: number): Promise<Array<any>> {
    let response = await this.http.get<any>(this.endpoint + "/" + woeid).toPromise();
    response = JSON.parse(response.contents);
    return response.consolidated_weather;
  }
}
