import {PixiAnchor, PixiPosition, PixiStyle} from './pixi.style';
import {PixiAnimation} from './pixi.animation';
import {PixiEvent} from './pixi.event';
import {PixiService} from './pixi.service';

declare var PIXI: any;

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
    this._style = new PixiStyle();
    this._animation = new PixiAnimation();
    this._position = new PixiPosition();
    this._anchor = new PixiAnchor();
    this._event = new PixiEvent();
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

  height() {
    if (this.instanceObject) {
      return this.instanceObject.height;
    }
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

    let delay = this.delay(ticker.FPS);
    let renderedFPS = 0;

    this.handlerTicker = (deltaTime) => {
      const durationFPS = this.animation.duration * (fps / 1000);
      const alpha       = Math.abs(this.animation.alpha.from - this.animation.alpha.to) / durationFPS;
      const blur        = Math.abs(this.animation.blur.from - this.animation.blur.to) / durationFPS;
      const scale       = Math.abs(this.animation.scale.from - this.animation.scale.to) / durationFPS;
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

      // Animation Scale
      if (this.instanceObject !== undefined && this.instanceObject.scale !== null) {
        const isScaleUp = this.animation.scale.from < this.animation.scale.to;

        if (isScaleUp) {
          this.instanceObject.scale.x += scale;
          this.instanceObject.scale.y += scale;
        } else {
          this.instanceObject.scale.x -= scale;
          this.instanceObject.scale.y -= scale;
        }

        // scale MIN値
        if (this.instanceObject.scale.x < 0) {
          this.instanceObject.scale.x = 0;
        }
        if (this.instanceObject.scale.y < 0) {
          this.instanceObject.scale.y = 0;
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
      filterBlur.blur = this.animation.blur.from;
      img.filters = [filterBlur];
    }

    // zIndex
    if (this.style.zIndex) {
      img.zIndex = this.style.zIndex;
    }

    stage.addChild(img);

    stage.updateLayersOrder();

    // インスタンスの保存
    this.instanceObject = img;
  }

  height() {
    return this.instanceObject.height;
  }

  width() {
    return this.instanceObject.width;
  }
}

/**
 * Rect
 */
export class PixiRect extends PixiMethodBase {

  constructor(pixiService: PixiService) {
    super(pixiService);
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

    if (this.style.zIndex) {
      rect.zIndex = this.style.zIndex;
    }

    // Add Stage
    stage.addChild(rect);

    stage.updateLayersOrder();

    // Rectのインスタンスを登録する
    this.instanceObject = rect;
  }

  ended(stage) {
    // 終了イベントの発火
    this.pixiService.setMode(`${stage}_ended`);
  }
}

/**
 * Circle
 */
export class PixiCircle extends PixiMethodBase {
  constructor(pixiService: PixiService) {
    super(pixiService);
  }

  put(stage) {
    const graphics = new PIXI.Graphics();

    graphics.beginFill(this.style.color);
    const circle = graphics.drawCircle(0, 0, this.style.radius);

    circle.x = this.position.x;
    circle.y = this.position.y;

    circle.alpha = this.style.alpha;

    if (this.style.zIndex) {
      circle.zIndex = this.style.zIndex;
    }

    stage.addChild(circle);

    stage.updateLayersOrder();

    this.instanceObject = circle;
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

  set value(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  put(stage) {
    const style = {
      'fontSize': this.style.fontSize,
      'fontWeight': this.style.fontWeight,
      'fontFamily': this.style.fontFamily,
      'align': this.style.align,
      'fill': this.style.color,
    };
    const text = new PIXI.Text(this.value, style);

    text.position.x = this.position.x;
    text.position.y = this.position.y;

    text.anchor.x = this.anchor.x;
    text.anchor.y = this.anchor.y;

    text.alpha = this.animation.alpha.from;

    // Blur
    const filterBlur = new PIXI.filters.BlurFilter();
    filterBlur.blur = this.animation.blur.from;
    text.filters = [filterBlur];

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

    if (this.style.zIndex) {
      text.zIndex = this.style.zIndex;
    }

    // Add Stage
    stage.addChild(text);

    stage.updateLayersOrder();

    // Save instance
    this.instanceObject = text;
  }
}
