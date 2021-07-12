import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesAPIService {
  private endpoint: string = 'https://nominatim.openstreetmap.org/search?format=json&';

  constructor(private http: HttpClient) { }

  async searchCities(name: string): Promise<Array<any>> {
    const response = await this.http.get<Array<any>>(this.endpoint + `city=${name}`).toPromise();
    return response;
  }
}
