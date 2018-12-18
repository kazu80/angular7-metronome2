import {Component, ElementRef, OnInit} from '@angular/core';

declare var Stats: any;

@Component({
  selector: 'app-stats',
  template: ``,
  styleUrls: []
})
export class StatsComponent implements OnInit {
  private stats: any;
  private _el: HTMLElement;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;

    this.stats = new Stats();
    this.stats.dom.style.position = 'fixed';
    this.stats.dom.style.right = '5px';
    this.stats.dom.style.left = 'unset';
    this.stats.dom.style.top = '5px';

    this._el.appendChild(this.stats.dom);
  }

  ngOnInit() {
    this.stats.showPanel(0);

    requestAnimationFrame(this.animate.bind(this));
  }

  animate(this) {
    this.stats.begin();

    this.stats.end();

    requestAnimationFrame(this.animate.bind(this));
  }
}
