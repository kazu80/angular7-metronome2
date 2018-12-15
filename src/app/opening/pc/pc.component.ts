import { Component, OnInit } from '@angular/core';

declare var PIXI: any;

@Component({
  selector: 'app-opening-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.scss']
})
export class PcComponent implements OnInit {
  public app: any;

  constructor() {
      this.app = new PIXI.Application({
          width: 800,
          height: 600
      });
  }

  ngOnInit() {
  }

}
