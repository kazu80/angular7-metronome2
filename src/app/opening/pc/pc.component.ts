import {Component, ElementRef, OnInit} from '@angular/core';
import {MainService} from '../../service/main.service';
import {PixiService} from '../../service/pixi.service';

declare var PIXI: any;

@Component({
  selector   : 'app-opening-pc',
  templateUrl: './pc.component.html',
  styleUrls  : ['./pc.component.scss']
})
export class PcComponent implements OnInit {
  public app: any;
  // public texts: Array = [];

  private _el: HTMLElement;

  constructor(
    el: ElementRef,
    private mainService: MainService,
    private pixiService: PixiService
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
    // Set Event
    this.eventOfMode();

    // Set Mode - stage0
    this.mainService.setMode('stage0');
  }

  eventOfMode () {
    this.mainService.mode.subscribe((mode: string) => {
      switch (mode) {
        case 'stage0':
          this.openingInit();
          break;
        case 'stage1':
          this.stage1();
          break;
      }
    });
  }

  /**
   * Event
   */
  openingInit() {
    // Pixi.js
    this.app = new PIXI.Application({});
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display  = 'block';
    this.app.renderer.autoResize          = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.app.renderer.backgroundColor = 0xffffff;

    /** Initial message **/
    /*
    const button      = this.addText('METRONOME', {fontSize: '80px', fontFamily: 'brandon-grotesque', fontWeight: 'BOLD'});
    button.anchor.x   = 0.5;
    button.anchor.y   = 0.5;
    button.position.x = window.innerWidth * 0.5;
    button.position.y = window.innerHeight * 0.5;

    // ボタンをステージに追加
    this.app.stage.addChild(button);
    */

    // Add the canvas that Pixi automatically created for you to the HTML document
    this._el.querySelector('#canvas-wrapper').appendChild(this.app.view);

    this.mainService.setMode('stage1');
  }

  stage1() {

    const text = this.pixiService.text();
    text.value = 'PRODUCE BY\n\n KAZUYOSHI KAWAKAMI\n @kawakami0717';

    text.style.fontSize   = '36px';
    text.style.fontWeight = 'bold';
    text.style.align      = 'center';

    text.animation.alpha.from = 0;
    text.animation.alpha.to   = 1;
    text.animation.blur.from  = 0;
    text.animation.blur.to    = 0;
    text.animation.duration   = 1000;
    text.animation.delay      = 1000;

    text.position.x = window.innerWidth * 0.5 - 20;
    text.position.y = window.innerHeight * 0.5;
    text.anchor.x   = 0.5;
    text.anchor.y   = 0.5;

    text.put(this.app.stage);
    text.run(this.app.ticker);
  }

  /**
   * Add Texts
   */
  addText(string, style) {
    const text = new PIXI.Text(string, style);
    // this.texts.push(text);

    return text;
  }
}
