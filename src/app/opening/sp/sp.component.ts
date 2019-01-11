import {Component, ElementRef, OnInit} from '@angular/core';
import {MainService} from '../../service/main.service';
import {PixiService} from '../../service/pixi.service';
import {PixiText} from '../../service/pixi.methods';

declare var PIXI: any;

@Component({
  selector   : 'app-opening-sp',
  templateUrl: './sp.component.html',
  styleUrls  : ['./sp.component.scss']
})
export class SpComponent implements OnInit {
  public app: any;

  private _el: HTMLElement;

  private _text01: PixiText;

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
    this.mainService.setModeSP('stage0');
  }

  eventOfMode() {
    this.mainService.modeSP.subscribe((mode: string) => {
      switch (mode) {
        case 'stage0':
          this.openingInit();
          break;
        case 'stage1':
          this.stage1();
          break;
        case 'stage2':
          this.stage2();
          break;
      }
    });

    this.pixiService.modeSP.subscribe((mode: string) => {
      switch (mode) {
        case '':
          break;
      }
    });
  }

  openingInit() {
    // Pixi.js
    this.app = new PIXI.Application({});
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.autoResize = true;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.app.renderer.backgroundColor = 0xffffff;

    // Add the canvas that Pixi automatically created for you to the HTML document
    this._el.querySelector('#canvas-wrapper-sp').appendChild(this.app.view);

    this.mainService.setModeSP('stage1');
  }

  stage1() {
    this._text01 = this.pixiService.text();
    this._text01.value = 'START';

    this._text01.style.fontSize = '36px';
    this._text01.style.fontWeight = 'bold';
    this._text01.style.align = 'center';

    this._text01.position.x = window.innerWidth * 0.5;
    this._text01.position.y = window.innerHeight * 0.5;
    this._text01.anchor.x = 0.5;
    this._text01.anchor.y = 0.5;

    this._text01.event.tap = () => {
      this.mainService.setModeSP('stage2');
    };

    this._text01.put(this.app.stage);
    this._text01.run('stage1', this.app.ticker);
  }

  stage2() {
    this._text01.animation.alpha.from = 1;
    this._text01.animation.alpha.to   = 0;
    this._text01.animation.blur.from  = 0;
    this._text01.animation.blur.to    = 5;
    this._text01.animation.duration   = 400;

    this._text01.run('stage2', this.app.ticker);
  }
}
