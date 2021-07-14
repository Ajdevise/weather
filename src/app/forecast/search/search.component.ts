import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city.interface';
import { WeatherApiService } from 'src/app/services/weather-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  cities: Array<any> = [];
  loading: boolean = false;
  noResults: boolean = false;

  constructor(private weatherApi: WeatherApiService, private router: Router) { }

  ngOnInit() {
  }

  async getCities(query: string) {
    if(query.length < 3) {
      alert("you must enter atleast three characters");
      return;
    }

    this.cities = [];
    this.noResults = false;
    this.loading = true;
    const cities = await this.weatherApi.fetchCities(query);
    cities.forEach(city => {
      const lattLong: Array<string> = city.latt_long.split(",");
      const cityObj: City = {
        name: city.title,
        latt: parseFloat(lattLong[0].trim()),
        long: parseFloat(lattLong[1].trim())
      };
      this.cities.push(cityObj);
    })
    if(this.cities.length === 0) this.noResults = true;
    this.loading = false;
  }

  async getWeatherInfo(city: City) {
    this.router.navigate(['']);
    await this.weatherApi.fetchForecastDataByCoordinates(city.latt, city.long);
  }
}