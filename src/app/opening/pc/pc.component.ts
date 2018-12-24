import {Component, ElementRef, OnInit} from '@angular/core';
import {MainService} from '../../service/main.service';
import {PixiService, PixiText} from '../../service/pixi.service';

declare var PIXI: any;

@Component({
  selector   : 'app-opening-pc',
  templateUrl: './pc.component.html',
  styleUrls  : ['./pc.component.scss']
})
export class PcComponent implements OnInit {
  public app: any;

  private _el: HTMLElement;
  private _text01: PixiText;
  private _rect01: any;

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

    this.pixiService.mode.subscribe((mode: string) => {
      switch (mode) {
        case 'stage1_ended':
          this.stage2();
          break;
        case 'stage2_ended':
          this.stage3();
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

    // Add the canvas that Pixi automatically created for you to the HTML document
    this._el.querySelector('#canvas-wrapper').appendChild(this.app.view);

    this.mainService.setMode('stage1');
  }

  stage1() {
    this._text01       = this.pixiService.text();
    this._text01.value = 'PRODUCE BY\n\n KAZUYOSHI KAWAKAMI\n @kawakami0717';

    this._text01.style.fontSize   = '36px';
    this._text01.style.fontWeight = 'bold';
    this._text01.style.align      = 'center';

    this._text01.animation.alpha.from = 0;
    this._text01.animation.alpha.to   = 1;
    this._text01.animation.blur.from  = 5;
    this._text01.animation.blur.to    = 0;
    this._text01.animation.duration   = 500;
    this._text01.animation.delay      = 1000;

    this._text01.position.x = window.innerWidth * 0.5 - 20;
    this._text01.position.y = window.innerHeight * 0.5;
    this._text01.anchor.x   = 0.5;
    this._text01.anchor.y   = 0.5;

    this._text01.put(this.app.stage);
    this._text01.run('stage1', this.app.ticker);
  }

  stage2() {
    setTimeout(() => {
      this._text01.animation.alpha.from = 1;
      this._text01.animation.alpha.to   = 0;
      this._text01.animation.blur.from  = 0;
      this._text01.animation.blur.to    = 5;
      this._text01.animation.duration   = 500;

      this._text01.run('stage2', this.app.ticker);

    }, 2000);
  }

  stage3() {
    this._rect01 = this.pixiService.rect();

    this._rect01.style.width  = window.innerWidth * 0.5;
    this._rect01.style.height = window.innerHeight;
    this._rect01.style.color  = '0xDD0031';
    this._rect01.position.x   = 0;
    this._rect01.position.y   = window.innerHeight * -1;

    this._rect01.put(this.app.stage);
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
