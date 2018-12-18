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
  private _align: string;

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
}

export class PixiAnimationAlpha {
  private _from: number;
  private _to: number;

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

export class PixiAnimationBlur {
  _from: number;
  _to: number;

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
  _position: PixiPosition;
  _anchor: PixiAnchor;

  _value: string;
  _x: number;
  _y: number;

  constructor () {
    this._config = {
      'value': '',
    };

    this._style     = new PixiStyle();
    this._animation = new PixiAnimation();
    this._position  = new PixiPosition();
    this._anchor    = new PixiAnchor();
  }

  set value (value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
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

  get position() {
    return this._position;
  }

  get anchor() {
    return this._anchor;
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
