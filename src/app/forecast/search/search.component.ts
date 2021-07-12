import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
      const parts = city.display_name.split(", ");
      this.cities.push(`${parts[0]}, ${parts[parts.length - 1]}`);
    })
    this.loading = false;
  }

  async getWeatherInfo(cityName: string) {
    await this.weatherApi.fetchForecastDataByLocationName(cityName.split(", ")[0]);
    this.router.navigate(['']);
  }
}
