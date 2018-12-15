import {Component, ElementRef, OnInit} from '@angular/core';

declare var PIXI: any;

@Component({
  selector: 'app-opening-pc',
  templateUrl: './pc.component.html',
  styleUrls: ['./pc.component.scss']
})
export class PcComponent implements OnInit {
  public app: any;

  private _el: HTMLElement;

  constructor(el: ElementRef) {
      this._el = el.nativeElement;

      // Pixi.js
      this.app = new PIXI.Application({
          width: 800,
          height: 600
      });
  }

  ngOnInit() {
      this.app.renderer.view.style.position = 'absolute';
      this.app.renderer.view.style.display = 'block';
      this.app.renderer.autoResize = true;
      this.app.renderer.resize(window.innerWidth, window.innerHeight);
      this.app.renderer.backgroundColor = 0xffffff;

      // Add the canvas that Pixi automatically created for you to the HTML document
      this._el.querySelector('#canvas-wrapper').appendChild(this.app.view);
  }

}
