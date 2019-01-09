import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

declare var PIXI: any;

export class PixiConfig {
  value: string;
}

export class PixiStyle {
  private _fontSize: string;
  private _fontWeight: string;
  private _fontFamily: string;
  private _color: string;
  private _align: string;
  private _width: number;
  private _height: number;

  set color(value: string) {
    this._color = value;
  }

  get color() {
    return this._color || '0x000000';
  }

  set fontWeight(value: string) {
    this._fontWeight = value;
  }

  get fontWeight() {
    return this._fontWeight;
  }

  set fontSize(value: string) {
    this._fontSize = value;
  }

  get fontSize() {
    return this._fontSize;
  }

  set fontFamily(value: string) {
    this._fontFamily = value;
  }

  get fontFamily() {
    return this._fontFamily || 'brandon-grotesque';
  }

  get align() {
    return this._align || 'left';
  }

  set align(value: string) {
    this._align = value;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }

  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }
}

export class PixiAnimationBase {
  private _from: number;
  private _to: number;

  constructor() {
  }

  get from(): number {
    return this._from;
  }

  set from(value: number) {
    this._from = value;
  }

  get to(): number {
    return this._to;
  }

  set to(value: number) {
    this._to = value;
  }
}

export class PixiAnimationAlpha extends PixiAnimationBase {
  constructor() {
    super();
    this.from = 1;
    this.to   = 1;
  }
}

export class PixiAnimationBlur extends PixiAnimationBase {
  constructor() {
    super();
    this.from = 0;
    this.to   = 0;
  }
}

export class PixiAnimationPositionX extends PixiAnimationBase {
  constructor() {
    super();
    this.from = 0;
    this.to   = 0;
  }
}

export class PixiAnimationPositionY extends PixiAnimationBase {
  constructor() {
    super();
    this.from = 0;
    this.to   = 0;
  }
}

export class PixiAnimationPosition {
  private _x: PixiAnimationPositionX;
  private _y: PixiAnimationPositionY;

  constructor() {
    this._x = new PixiAnimationPositionX();
    this._y = new PixiAnimationPositionY();
  }

  get y(): PixiAnimationPositionY {
    return this._y;
  }

  get x(): PixiAnimationPositionX {
    return this._x;
  }
}

export class PixiPosition {
  _x: number;
  _y: number;

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(value: number) {
    this._x = value;
  }

  set y(value: number) {
    this._y = value;
  }
}

export class PixiAnchor {
  _x: number;
  _y: number;

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(value: number) {
    this._x = value;
  }

  set y(value: number) {
    this._y = value;
  }
}

export class PixiAnimation {
  _alpha: PixiAnimationAlpha;
  _blur: PixiAnimationBlur;
  _position: PixiAnimationPosition;
  _duration: number;
  _delay: number;

  constructor() {
    this._alpha    = new PixiAnimationAlpha();
    this._blur     = new PixiAnimationBlur();
    this._position = new PixiAnimationPosition();
    this._delay    = 0;
  }

  get alpha() {
    return this._alpha;
  }

  get blur() {
    return this._blur;
  }

  get duration() {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get delay() {
    return this._delay;
  }

  set delay(value: number) {
    this._delay = value;
  }

  get position() {
    return this._position;
  }
}

export class PixiEvent {
  private _click: object;
  private _tap: object;

  get click(): object {
    return this._click;
  }

  set click(value: object) {
    this._click = value;
  }

  get tap(): object {
    return this._tap;
  }

  set tap(value: object) {
    this._tap = value;
  }
}

/** methods **/

export class PixiMethodBase {
  private _position: PixiPosition;
  private _style: PixiStyle;
  private _animation: PixiAnimation;
  private _anchor: PixiAnchor;
  private _event: PixiEvent;
  private _handlerTicker: any;
  public instanceObject: any;

  constructor(
    private _pixiService: PixiService
  ) {
    this._style     = new PixiStyle();
    this._animation = new PixiAnimation();
    this._position  = new PixiPosition();
    this._anchor    = new PixiAnchor();
    this._event     = new PixiEvent();
  }

  get pixiService() {
    return this._pixiService;
  }

  get style() {
    return this._style;
  }

  get position() {
    return this._position;
  }

  get animation() {
    return this._animation;
  }

  get anchor() {
    return this._anchor;
  }

  get event() {
    return this._event;
  }

  get handlerTicker() {
    return this._handlerTicker;
  }

  set handlerTicker(value: Object) {
    this._handlerTicker = value;
  }

  fps(ticker: any) {
    return ticker.FPS;
  }

  delay(fps: number) {
    return this.animation.delay * (fps / 1000);
  }

  FPSDuration(fps: number) {
    return this.animation.duration * (fps / 1000);
  }

  run(stage, ticker: any) {
    const fps = this.fps(ticker);

    let delay       = this.delay(ticker.FPS);
    let renderedFPS = 0;

    this.handlerTicker = (deltaTime) => {
      const durationFPS = this.animation.duration * (fps / 1000);
      const alpha       = Math.abs(this.animation.alpha.from - this.animation.alpha.to) / durationFPS;
      const blur        = Math.abs(this.animation.blur.from - this.animation.blur.to) / durationFPS;
      const positionY   = Math.abs(this.animation.position.y.from - this.animation.position.y.to) / durationFPS;

      /**
       * Duration処理
       * 設定されていなかったら、すぐに終了させる。
       */
      if (this.animation.duration === undefined || renderedFPS >= durationFPS) {
        // Animation が終わったらTickerを消す
        ticker.remove(this._handlerTicker);

        renderedFPS = 0;

        // 終了イベントの発火
        this.pixiService.setMode(`${stage}_ended`);
        return;
      }

      // Delay
      if (delay > 0) {
        delay--;
        return;
      }

      // Animation Alpha
      if (this.instanceObject !== undefined) {
        const isPlus = this.animation.alpha.from < this.animation.alpha.to;

        if (isPlus) {
          this.instanceObject.alpha += alpha;
        } else {
          this.instanceObject.alpha -= alpha;
        }

        // alpha MAX値
        if (this.instanceObject.alpha > 1) {
          this.instanceObject.alpha = 1;
        }

        // alpha MIN値
        if (this.instanceObject.alpha < 0) {
          this.instanceObject.alpha = 0;
        }
      }

      // Animation Blur
      if (this.instanceObject !== undefined && this.instanceObject.filters !== null) {
        const instanceBlur = this.instanceObject.filters[0];

        if (instanceBlur) {
          const isDown = this.animation.blur.from > this.animation.blur.to;

          if (isDown) {
            instanceBlur.blur -= blur;
          } else {
            instanceBlur.blur += blur;
          }

          // blur MIN値
          if (instanceBlur.blur < 0) {
            instanceBlur.blur = 0;
          }
        }
      }

      // Animation Move
      if (this.instanceObject !== undefined) {

        // 下移動か、上移動かを判定
        const isAnimationDown = this.animation.position.y.to > this.animation.position.y.from;

        if (isAnimationDown === true) {

          // Rectの高さ以上にY移動がある場合は、RectのYは高さと同じにする
          if (this.instanceObject.y + positionY > this.style.height) {
            this.instanceObject.y = this.style.height;
          } else {
            this.instanceObject.y += positionY;
          }
        } else {

          // Rectの高さ以上にY移動がある場合（下移動）は、RectのYは高さと同じにする
          if (this.instanceObject.y - positionY < this.style.height * -1) {
            this.instanceObject.y = this.style.height * -1;
          } else {
            this.instanceObject.y -= positionY;
          }
        }
      }

      renderedFPS++;
    };

    // Ticker登録
    ticker.add(this.handlerTicker);
  }
}

/**
 * Image
 */
export class PixiImage extends PixiMethodBase {
  constructor(pixiService: PixiService) {
    super(pixiService);
  }

  put(stage, path: string) {
    const img = PIXI.Sprite.fromImage(path);

    img.anchor.x = this.anchor.x;
    img.anchor.y = this.anchor.y;

    img.x = this.position.x;
    img.y = this.position.y;

    if (this.animation.alpha.from !== undefined) {
      img.alpha = this.animation.alpha.from;
    }

    // Blur
    if (this.animation.blur.from) {
      const filterBlur = new PIXI.filters.BlurFilter();
      filterBlur.blur  = this.animation.blur.from;
      img.filters      = [filterBlur];
    }

    stage.addChild(img);

    // インスタンスの保存
    this.instanceObject = img;
  }
}

/**
 * Rect
 */
export class PixiRect extends PixiMethodBase {
  private _isTickerCreated: boolean;

  constructor(pixiService: PixiService) {
    super(pixiService);

    this._isTickerCreated = false;
  }

  put(stage) {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(this.style.color);

    const rect = graphics.drawRect(
      this.position.x,
      this.position.y,
      this.style.width,
      this.style.height
    );

    // Add Stage
    stage.addChild(rect);

    // Rectのインスタンスを登録する
    this.instanceObject = rect;
  }

  ended(stage) {
    // 終了イベントの発火
    this.pixiService.setMode(`${stage}_ended`);
  }
}

/**
 * Text
 */
export class PixiText extends PixiMethodBase {
  _value: string;

  constructor(pixiService: PixiService) {
    super(pixiService);
  }

  set value (value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  put(stage) {
    const style = {
      'fontSize'  : this.style.fontSize,
      'fontWeight': this.style.fontWeight,
      'fontFamily': this.style.fontFamily,
      'align'     : this.style.align,
      'fill'      : this.style.color,
    };
    const text = new PIXI.Text(this.value, style);

    text.position.x = this.position.x;
    text.position.y = this.position.y;

    text.anchor.x = this.anchor.x;
    text.anchor.y = this.anchor.y;

    text.alpha = this.animation.alpha.from;

    // Blur
    const filterBlur = new PIXI.filters.BlurFilter();
    filterBlur.blur  = this.animation.blur.from;
    text.filters     = [filterBlur];

    // Event
    if (this.event.click !== undefined) {
      // タッチイベントの有効化
      text.interactive = true;

      // イベント登録
      text.on('click', this.event.click);
    }

    if (this.event.tap !== undefined) {
      text.interactive = true;
      text.on('tap', this.event.tap);
    }

    // Add Stage
    stage.addChild(text);

    // Save instance
    this.instanceObject = text;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PixiService {
  private _mode: Subject<any>;
  private _modeSP: Subject<any>;
  public mode: Observable<any>;
  public modeSP: Observable<any>;

  constructor() {
    this._mode = new Subject();
    this._modeSP = new Subject();
    this.mode = this._mode.asObservable();
    this.modeSP = this._modeSP.asObservable();
  }

  setMode(value: string) {
    this._mode.next(value);
  }

  setModeSP(value: string) {
    this._modeSP.next(value);
  }

  text (): PixiText {
    return new PixiText(this);
  }

  rect(): PixiRect {
    return new PixiRect(this);
  }

  image(): PixiImage {
    return new PixiImage(this);
  }
}
