import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.scss']
})
export class ForecastCardComponent implements OnInit {
  @Input() delay: number;
  @HostBinding("style.animationDelay") animationDelay: string;

  constructor() { }

  ngOnInit() {
    this.animationDelay = this.delay + "s";
  }

}
