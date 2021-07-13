import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city.interface';
import { PlacesAPIService } from 'src/app/services/places-api.service';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  cities: Array<any> = [];
  loading: boolean = false;

  constructor(private placesApi: PlacesAPIService, private weatherApi: WeatherApiService, private router: Router) { }

  ngOnInit() {
  }

  async getCities(name: string) {
    this.cities = [];
    this.loading = true;
    const cities = await this.placesApi.searchCities(name);
    cities.forEach(city => {
      console.log(city);
      const parts: Array<string> = city.display_name.split(", ");
      const cityObj: City = {
        name: `${parts[0]}, ${parts[parts.length - 1]}`,
        latt: city.lat,
        long: city.lon
      };
      this.cities.push(cityObj);
    })
    this.loading = false;
  }

  async getWeatherInfo(city: City) {
    this.router.navigate(['']);
    await this.weatherApi.fetchForecastDataByCoordinates(city.latt, city.long);
  }
}