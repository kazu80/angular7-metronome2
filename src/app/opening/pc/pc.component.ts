import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {MainService} from '../../service/main.service';
import {PixiImage, PixiRect, PixiService, PixiText} from '../../service/pixi.service';

declare var PIXI: any;

@Component({
  selector   : 'app-opening-pc',
  templateUrl: './pc.component.html',
  styleUrls  : ['./pc.component.scss']
})
export class PcComponent implements OnInit, OnDestroy {
  public app: any;

  private _el: HTMLElement;

  // stageをまたいだアニメーションに使用する
  private _text01: PixiText;
  private _text02: PixiText;
  private _text03: PixiText;
  private _text04: PixiText;
  private _rect01: PixiRect;
  private _rect02: PixiRect;
  private _image01: PixiImage;
  private _image02: PixiImage;

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

  ngOnDestroy() {

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
        case 'stage4_ended':
          this.stage5();
          this.stage6();
          this.stage7();
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
    this._text01.animation.delay = 800;

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
      this._text01.animation.duration = 400;

      this._text01.run('stage2', this.app.ticker);

    }, 1000);
  }

  stage3() {
    this._rect01 = this.pixiService.rect();
    this._rect02 = this.pixiService.rect();

    // Width / Height
    this._rect01.style.width  = window.innerWidth * 0.5;
    this._rect01.style.height = window.innerHeight;
    this._rect02.style.width  = window.innerWidth * 0.5;
    this._rect02.style.height = window.innerHeight;

    // Color
    this._rect01.style.color = '0xDD0031';
    this._rect02.style.color = '0xC3002F';

    // Position
    this._rect01.position.x = 0;
    this._rect01.position.y = window.innerHeight * -1;
    this._rect02.position.x = window.innerWidth * 0.5;
    this._rect02.position.y = window.innerHeight;

    // Animation
    this._rect01.animation.delay           = 1000;
    this._rect01.animation.position.y.from = 0;
    this._rect01.animation.position.y.to   = window.innerHeight;
    this._rect01.animation.duration        = 400;

    this._rect02.animation.delay           = 1000;
    this._rect02.animation.position.y.from = window.innerHeight;
    this._rect02.animation.position.y.to   = 0;
    this._rect02.animation.duration        = 400;

    // Put / Run
    this._rect01.put(this.app.stage);
    this._rect01.run('stage3', this.app.ticker);
    this._rect02.put(this.app.stage);
    this._rect02.run('stage4', this.app.ticker);
  }

  stage5() {
    this._image01 = this.pixiService.image();

    this._image01.style.width  = 159;
    this._image01.style.height = 208;

    this._image01.position.x = window.innerWidth * 0.5;
    this._image01.position.y = window.innerHeight * 0.5 - 60;

    this._image01.anchor.x = 0.44;
    this._image01.anchor.y = 0.5;

    this._image01.animation.alpha.from = 0;
    this._image01.animation.alpha.to   = 1;
    this._image01.animation.blur.from  = 5;
    this._image01.animation.blur.to    = 0;
    this._image01.animation.duration   = 500;
    this._image01.animation.delay      = 800;

    this._image01.put(this.app.stage, 'assets/image/pc/logo.png');
    this._image01.run('stage5', this.app.ticker);
  }

  stage6() {
    this._text02       = this.pixiService.text();
    this._text02.value = 'METRONOME';

    this._text02.style.fontSize   = '70px';
    this._text02.style.fontWeight = 'bold';
    this._text02.style.color      = '0xFFFFFF';

    this._text02.animation.alpha.from = 0;
    this._text02.animation.alpha.to   = 1;
    this._text02.animation.blur.from  = 5;
    this._text02.animation.blur.to    = 0;
    this._text02.animation.duration   = 500;
    this._text02.animation.delay      = 800;

    this._text02.position.x = window.innerWidth * 0.5;
    this._text02.position.y = window.innerHeight * 0.5 + 101 + 13;
    this._text02.anchor.x   = 0.5;
    this._text02.anchor.y   = 0.5;

    this._text02.put(this.app.stage);
    this._text02.run('stage6', this.app.ticker);
  }

  stage7() {
    this._text03       = this.pixiService.text();
    this._text03.value = 'CLICK';

    this._text03.style.fontSize   = '36px';
    this._text03.style.fontWeight = 'bold';
    this._text03.style.color      = '0xFFFFFF';

    this._text03.animation.alpha.from = 0;
    this._text03.animation.alpha.to   = 1;
    this._text03.animation.blur.from  = 5;
    this._text03.animation.blur.to    = 0;
    this._text03.animation.duration   = 500;
    this._text03.animation.delay      = 800 + 500;

    this._text03.position.x = window.innerWidth * 0.5;
    this._text03.position.y = window.innerHeight * 0.5 + 101 + 13 + 101;
    this._text03.anchor.x   = 0.5;
    this._text03.anchor.y   = 0.5;

    // Event
    this._text03.event.click = () => {
      this.stage8();
    };

    this._text03.put(this.app.stage);
    this._text03.run('stage7', this.app.ticker);
  }

  stage8() {
    this._image01.animation.position.y.from = window.innerHeight * 0.5 - 60;
    this._image01.animation.position.y.to   = window.innerHeight * 0.5 - 60 - 120;
    this._image01.animation.duration        = 400;
    this._image01.animation.delay           = 0;

    this._image01.run('stage8', this.app.ticker);

    this._text02.animation.position.y.from = window.innerHeight * 0.5 + 114;
    this._text02.animation.position.y.to   = window.innerHeight * 0.5 + 114 - 120;
    this._text02.animation.duration        = 400;
    this._text02.animation.delay           = 0;

    this._text02.run('stage8', this.app.ticker);

    this._text03.animation.alpha.from = 1;
    this._text03.animation.alpha.to   = 0;
    this._text03.animation.blur.from  = 0;
    this._text03.animation.blur.to    = 5;
    this._text03.animation.duration   = 400;
    this._text03.animation.delay      = 0;

    this._text03.run('stage8', this.app.ticker);

    this._image02                      = this.pixiService.image();
    this._image02.style.width          = 150;
    this._image02.style.height         = 150;
    this._image02.position.x           = window.innerWidth * 0.5;
    this._image02.position.y           = window.innerHeight * 0.5 + 150;
    this._image02.anchor.x             = 0.5;
    this._image02.anchor.y             = 0.5;
    this._image02.animation.alpha.from = 0;
    this._image02.animation.alpha.to   = 1;
    this._image02.animation.blur.from  = 5;
    this._image02.animation.blur.to    = 0;
    this._image02.animation.duration   = 500;
    this._image02.animation.delay      = 800;

    this._image02.put(this.app.stage, 'assets/image/pc/qr-code.png');
    this._image02.run('stage8', this.app.ticker);


    this._text04       = this.pixiService.text();
    this._text04.value = 'モバイルでアクセス';

    this._text04.style.fontSize   = '36px';
    this._text04.style.fontWeight = 'bold';
    this._text04.style.color      = '0xFFFFFF';

    this._text04.animation.alpha.from = 0;
    this._text04.animation.alpha.to   = 1;
    this._text04.animation.blur.from  = 5;
    this._text04.animation.blur.to    = 0;
    this._text04.animation.duration   = 500;
    this._text04.animation.delay      = 800;

    this._text04.position.x = window.innerWidth * 0.5;
    this._text04.position.y = window.innerHeight * 0.5 + 180 + 100;
    this._text04.anchor.x   = 0.5;
    this._text04.anchor.y   = 0.5;

    this._text04.put(this.app.stage);
    this._text04.run('stage8', this.app.ticker);
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
