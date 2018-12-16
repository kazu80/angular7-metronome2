import {Component, ElementRef, OnInit} from '@angular/core';

declare var PIXI: any;

@Component({
  selector   : 'app-opening-pc',
  templateUrl: './pc.component.html',
  styleUrls  : ['./pc.component.scss']
})
export class PcComponent implements OnInit {
  public app: any;
  public texts: Array = [];

  private _el: HTMLElement;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;

    // Pixi.js
    this.app = new PIXI.Application({});
  }

  ngOnInit() {
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display  = 'block';
    this.app.renderer.autoResize          = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.app.renderer.backgroundColor = 0xffffff;

    // Set items on initial
    this.setInitialItems();

    // Add the canvas that Pixi automatically created for you to the HTML document
    this._el.querySelector('#canvas-wrapper').appendChild(this.app.view);
  }

  setInitialItems() {
    /** Initial message **/
    const button      = this.addText('METRONOME', {fontSize: '80px', fontFamily: 'brandon-grotesque', fontWeight: 'BOLD'});
    button.anchor.x   = 0.5;
    button.anchor.y   = 0.5;
    button.position.x = window.innerWidth * 0.5;
    button.position.y = window.innerHeight * 0.5;

    // ボタンをステージに追加
    this.app.stage.addChild(button);
  }

  /**
   * Add Texts
   */
  addText(string, style) {
    const text = new PIXI.Text(string, style);
    this.texts.push(text);

    return text;
  }
}
