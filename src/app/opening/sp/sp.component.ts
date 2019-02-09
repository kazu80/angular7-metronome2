import {Component, ElementRef, OnInit} from '@angular/core';
import {MainService} from '../../service/main.service';
import {PixiService} from '../../service/pixi/pixi.service';
import {PixiCircle, PixiImage, PixiText} from '../../service/pixi/pixi.methods';
import {PixiSound} from '../../service/pixi/pixi.sound';

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
  private _text02: PixiText;
  private _text03: PixiText;

  private _circle01: PixiCircle;
  private _circle02: PixiCircle;
  private _circle03: PixiCircle;

  private _image01: PixiImage;
  private _image02: PixiImage;

  private _sound01: PixiSound;

  constructor(
    el: ElementRef,
    private mainService: MainService,
    private pixiService: PixiService
  ) {
    this._el = el.nativeElement;

    this.mainService.device = 'sp';
    this.pixiService.device = 'sp';
  }

  ngOnInit() {
    // Set Event
    this.eventOfMode();

    /**
     * Soundを読み込む。読み込んだら始める
     */
    this._sound01 = this.pixiService.sound();
    this._sound01.resource([
      {'name': 'opening', 'path': 'assets/sound/staging/open01.mp3'},
      {'name': 'circle', 'path': 'assets/sound/staging/open02.mp3'},
      {'name': 'explosion', 'path': 'assets/sound/staging/open04.mp3'}
    ]).then(() => {

      // Set Mode - stage0
      this.mainService.setMode('stage0');
    });
  }

  eventOfMode() {
    this.mainService.getMode().subscribe((mode: string) => {
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
        case 'stage3':
          this.stage3();
          this.stage6Prepare();
          break;
        case 'stage6':
          this.stage6();
          break;
        case 'stage8':
          this.stage8();
          break;
        case 'stage9':
          this.stage9();
          break;
        case 'stage15':
          this.stage15();
          break;
        case 'stage17':
          this.stage17();
          break;
      }
    });

    this.pixiService.getMode().subscribe((mode: string) => {
      switch (mode) {
        case 'stage2_ended':
          this.mainService.setMode('stage3');
          break;
        case 'stage5_ended':
          this.mainService.setMode('stage6');
          break;
        case 'stage7_ended':
          this.mainService.setMode('stage8');
          break;
        case 'stage8_ended':
          this.mainService.setMode('stage9');
          break;
        case 'stage14_ended':
          this.mainService.setMode('stage15');
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

    // Control zIndex
    this.app.stage.updateLayersOrder = () => {
      this.app.stage.children.sort(function (a, b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;

        return b.zIndex - a.zIndex;
      });
    };

    this.mainService.setMode('stage1');
  }

  stage1() {
    this._text01 = this.pixiService.text();
    this._text01.value = 'START';

    this._text01.style.fontSize   = '36px';
    this._text01.style.fontWeight = 'bold';
    this._text01.style.align      = 'center';
    this._text01.style.color      = 'black';

    this._text01.position.x = window.innerWidth * 0.5;
    this._text01.position.y = window.innerHeight * 0.5;
    this._text01.anchor.x = 0.5;
    this._text01.anchor.y = 0.5;

    this._text01.event.tap = () => {
      // Sound再生
      const sound_progress = this._sound01.play('opening');
      let isStage2         = false;
      sound_progress.on('progress', (progress) => {
        if (isStage2 === false && Math.round(progress * 100) === 20) {
          isStage2 = true;

          this._sound01.play('circle');
          this.mainService.setMode('stage2');
        }
      });

      sound_progress.on('end', () => {
        this._sound01.play('explosion');
      });
    };

    this._text01.put(this.app.stage);
    this._text01.run('stage1', this.app.ticker);
  }

  stage2() {
    this._text01.animation.alpha.from = 1;
    this._text01.animation.alpha.to   = 0;
    this._text01.animation.blur.from  = 0;
    this._text01.animation.blur.to    = 5;
    this._text01.animation.duration   = 200;

    this._text01.run('stage2', this.app.ticker);
  }

  stage3() {
    this._circle01 = this.pixiService.circle();
    this._circle02 = this.pixiService.circle();
    this._circle03 = this.pixiService.circle();

    this._circle01.style.color = '0xDD0031';
    this._circle02.style.color = '0xDD0031';
    this._circle03.style.color = '0xDD0031';

    this._circle01.style.radius = 50;
    this._circle02.style.radius = 50;
    this._circle03.style.radius = 50;

    this._circle01.position.x = window.innerWidth * 0.5;
    this._circle01.position.y = window.innerHeight * 0.5;
    this._circle02.position.x = window.innerWidth * 0.5;
    this._circle02.position.y = window.innerHeight * 0.5;
    this._circle03.position.x = window.innerWidth * 0.5;
    this._circle03.position.y = window.innerHeight * 0.5;

    this._circle01.style.alpha = 1;
    this._circle02.style.alpha = .5;
    this._circle03.style.alpha = .25;

    this._circle01.style.zIndex = 100;
    this._circle02.style.zIndex = 90;
    this._circle03.style.zIndex = 80;

    this._circle01.animation.scale.from = 0;
    this._circle01.animation.scale.to   = 10;
    this._circle01.animation.duration   = 500;

    this._circle02.animation.scale.from = 0;
    this._circle02.animation.scale.to   = 10;
    this._circle02.animation.duration   = 300;

    this._circle03.animation.scale.from = 0;
    this._circle03.animation.scale.to   = 10;
    this._circle03.animation.duration   = 200;

    this._circle01.put(this.app.stage);
    this._circle01.run('stage3', this.app.ticker);

    this._circle02.put(this.app.stage);
    this._circle02.run('stage4', this.app.ticker);

    this._circle03.put(this.app.stage);
    this._circle03.run('stage5', this.app.ticker);
  }

  /**
   *  [METRONOME] LOGOを準備
   *  事前に用意しないとheight, widthが取れない
   */
  stage6Prepare() {
    this._image01 = this.pixiService.image();

    this._image01.style.zIndex = 60;

    this._image01.position.x = window.innerWidth * 0.5;
    this._image01.position.y = window.innerHeight * 0.5;

    this._image01.anchor.x = 0.45;
    this._image01.anchor.y = 0.6;

    this._image01.animation.alpha.from = 0;
    this._image01.animation.alpha.to   = 1;

    this._image01.put(this.app.stage, 'assets/image/sp/logo.svg');
  }

  stage6() {
    // [METRONOME] LOGOを準備
    this._image01.position.x = window.innerWidth * 0.5;
    this._image01.position.y = window.innerHeight * 0.5;

    this._image01.anchor.x = 0.45;
    this._image01.anchor.y = 0.6;

    this._image01.animation.alpha.from = 0;
    this._image01.animation.alpha.to   = 1;
    this._image01.animation.blur.from  = 5;
    this._image01.animation.blur.to    = 0;
    this._image01.animation.duration   = 200;
    this._image01.animation.delay      = 2000;

    this._image01.run('stage6', this.app.ticker);

    // [METRONOME]文字を準備
    this._text02       = this.pixiService.text();
    this._text02.value = 'METRONOME';

    this._text02.style.fontSize   = '40px';
    this._text02.style.fontWeight = 'bold';
    this._text02.style.align      = 'center';
    this._text02.style.color      = 'white';

    this._text02.position.x = window.innerWidth * 0.5;
    this._text02.position.y = this._image01.position.y + (this._image01.height() * 0.5) + 20;
    this._text02.anchor.x   = 0.5;
    this._text02.anchor.y   = 0.5;

    this._text02.animation.alpha.from = 0;
    this._text02.animation.alpha.to   = 1;
    this._text02.animation.blur.from  = 5;
    this._text02.animation.blur.to    = 0;
    this._text02.animation.duration   = 200;
    this._text02.animation.delay      = 2000;

    this._text02.put(this.app.stage);
    this._text02.run('stage7', this.app.ticker);
  }

  stage8() {
    this._image02 = this.pixiService.image();

    this._image02.position.x = window.innerWidth * 0.5;
    this._image02.position.y = window.innerHeight * -1.4;

    this._image02.anchor.x = 0.5;
    this._image02.anchor.y = 0.5;

    this._image02.style.zIndex = 70;

    this._image02.style.scale = 8;

    this._image02.animation.position.y.from = window.innerHeight * -1.4;
    this._image02.animation.position.y.to   = window.innerHeight * 0.5;

    this._image02.animation.duration = 1000;
    this._image02.animation.delay    = 5000;

    this._image02.put(this.app.stage, 'assets/image/sp/angular-blank.png');
    this._image02.run('stage8', this.app.ticker);
  }

  stage9() {
    // Circleを小さく
    this._circle01.animation.scale.from = 10;
    this._circle01.animation.scale.to   = 0;
    this._circle01.animation.duration   = 1;

    this._circle02.animation.scale.from = 10;
    this._circle02.animation.scale.to   = 0;
    this._circle02.animation.duration   = 1;

    this._circle03.animation.scale.from = 10;
    this._circle03.animation.scale.to   = 0;
    this._circle03.animation.duration   = 1;

    this._circle01.run('stage9', this.app.ticker);
    this._circle02.run('stage10', this.app.ticker);
    this._circle03.run('stage11', this.app.ticker);

    // METRONOME文字
    this._text02.style.color               = 'black';
    this._text02.animation.position.y.from = this._image01.position.y + (this._image01.height() * 0.5) + 20;
    this._text02.animation.position.y.to   = this._image01.position.y + (this._image01.height() * 0.5);
    this._text02.animation.delay           = 4600;
    this._text02.animation.duration        = 400;

    this._text02.run('stage12', this.app.ticker);

    //
    this._image01.animation.position.y.from = window.innerHeight * 0.5;
    this._image01.animation.position.y.to   = window.innerHeight * 0.5 - 80;
    this._image01.animation.delay           = 2800;
    this._image01.animation.duration        = 400;

    this._image01.run('stage13', this.app.ticker);

    // Logoを小さく
    this._image02.animation.scale.from = 8;
    this._image02.animation.scale.to   = 1.1;

    this._image02.animation.position.y.from = window.innerHeight * 0.51;
    this._image02.animation.position.y.to   = window.innerHeight * 0.5 - 80;

    this._image02.animation.delay    = 100;
    this._image02.animation.duration = 5000;

    this._image02.run('stage14', this.app.ticker);
  }

  stage15() {
    this._text03       = this.pixiService.text();
    this._text03.value = 'PLAY';

    this._text03.style.fontSize   = '36px';
    this._text03.style.fontWeight = 'bold';
    this._text03.style.align      = 'center';
    this._text03.style.color      = 'black';

    this._text03.position.x = window.innerWidth * 0.5;
    this._text03.position.y = this._text02.position.y + this._text02.height() + 20;
    this._text03.anchor.x   = 0.5;
    this._text03.anchor.y   = 0.5;


    this._text03.animation.alpha.from = 0;
    this._text03.animation.alpha.to   = 1;
    this._text03.animation.blur.from  = 5;
    this._text03.animation.blur.to    = 0;
    this._text03.animation.duration   = 400;
    this._text03.animation.delay      = 1500;

    this._text03.event.tap = () => {
      this.mainService.setMode('stage17');
    };

    this._text03.put(this.app.stage);
    this._text03.run('stage15', this.app.ticker);
  }

  stage17() {
    // SOUND
    this._sound01.play('circle');

    // LOGO
    this._image01.animation.alpha.from = 1;
    this._image01.animation.alpha.to   = 0;
    this._image01.animation.blur.from  = 0;
    this._image01.animation.blur.to    = 5;
    this._image01.animation.delay      = 1;
    this._image01.animation.duration   = 400;
    this._image01.run('stage18', this.app.ticker);

    // LOGO 背景
    this._image02.animation.alpha.from = 1;
    this._image02.animation.alpha.to   = 0;
    this._image02.animation.blur.from  = 0;
    this._image02.animation.blur.to    = 5;
    this._image02.animation.delay      = 1;
    this._image02.animation.duration   = 400;
    this._image02.run('stage19', this.app.ticker);

    // METRONOME文字
    this._text02.animation.alpha.from = 1;
    this._text02.animation.alpha.to   = 0;
    this._text02.animation.blur.from  = 0;
    this._text02.animation.blur.to    = 5;
    this._text02.animation.delay      = 1;
    this._text02.animation.duration   = 200;
    this._text02.run('stage20', this.app.ticker);

    // Play
    this._text03.animation.alpha.from = 1;
    this._text03.animation.alpha.to   = 0;
    this._text03.animation.blur.from  = 0;
    this._text03.animation.blur.to    = 5;
    this._text03.animation.delay      = 1;
    this._text03.animation.duration   = 200;
    this._text03.run('stage21', this.app.ticker);

    // Circleを大きく
    this._circle01.animation.scale.from = 0;
    this._circle01.animation.scale.to   = 10;
    this._circle01.animation.duration   = 500;
    this._circle01.animation.delay      = 300;

    this._circle02.animation.scale.from = 0;
    this._circle02.animation.scale.to   = 10;
    this._circle02.animation.duration   = 300;
    this._circle02.animation.delay      = 300;

    this._circle03.animation.scale.from = 0;
    this._circle03.animation.scale.to   = 10;
    this._circle03.animation.duration   = 200;
    this._circle03.animation.delay      = 300;

    this._circle01.run('stage22', this.app.ticker);
    this._circle02.run('stage23', this.app.ticker);
    this._circle03.run('stage24', this.app.ticker);
  }
}
