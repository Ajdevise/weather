import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './forecast/search/search.component';
import { WeatherTodayComponent } from './forecast/weather-today/weather-today.component';


const routes: Routes = [
  { path: '', component: WeatherTodayComponent },
  { path: 'search', component: SearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
