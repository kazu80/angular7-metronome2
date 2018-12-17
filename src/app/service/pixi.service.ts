import { Injectable } from '@angular/core';

declare var PIXI: any;

export class PixiConfig {
  value: string;
}

export class PixiStyle {
  private _fontSize: string;
  private _fontWeight: string;
  private _fontFamily: string;
  private _color: string;

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
}

export class PixiAnimationAlpha {
  from: number;
  to: number;
}

export class PixiAnimationBlur {
  from: number;
  to: number;
}

export class PixiAnimation {
  _alpha: PixiAnimationAlpha;
  _blur: PixiAnimationBlur;
  _duration: number;

  constructor() {
    this._alpha = new PixiAnimationAlpha();
    this._blur = new PixiAnimationBlur();
  }

  get alpha() {
    return this._alpha;
  }

  get blur() {
    return this._blur;
  }

  set duration(value: number) {
    this._duration = value;
  }
}

export class PixiText {
  _config: PixiConfig;
  _style: PixiStyle;
  _animation: PixiAnimation;

  _value: string;
  _x: number;
  _y: number;

  constructor () {
    this._config = {
      'value': '',
    };

    this._style = new PixiStyle();
    this._animation = new PixiAnimation();
  }

  set value (value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set x (value: number) {
    this._x = value;
  }

  get x() {
    return this._x;
  }

  set y (value: number) {
    this._y = value;
  }

  get y() {
    return this._y;
  }

  set text (value: string) {
    this._value = value;
  }

  get style () {
    return this._style;
  }

  get animation() {
    return this._animation;
  }

  put(stage) {
    const style = {
      'fontSize': this.style.fontSize,
      'fontWeight': this.style.fontWeight,
      'fontFamily': this.style.fontFamily,
      'fill': this.style.color,
    };
    const text = new PIXI.Text(this.value, style);

    text.position.x = this.x;
    text.position.y = this.y;

    stage.addChild(text);
  }
}

@Injectable({
  providedIn: 'root'
})
export class PixiService {
  private _text: string;

  constructor() { }

  text (): PixiText {
    return new PixiText();
  }
}
