import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.scss']
})
export class FiveDaysForecastComponent implements OnInit {
  arbitraryArray: Array<number> = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit() {
  }

}
