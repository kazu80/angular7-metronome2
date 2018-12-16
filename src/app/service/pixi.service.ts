import { Injectable } from '@angular/core';

export class PixiConfig {
  value: string;
}

export class PixiStyle {
  private _fontSize: string;
  private _fontWeight: string;
  private _color: string;

  set color(value: string) {
    this._color = value;
  }

  set fontWeight(value: string) {
    this._fontWeight = value;
  }

  set fontSize(value: string) {
    this._fontSize = value;
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

  alpha() {
    return this._alpha;
  }

  _blur() {
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

  set x (value: number) {
    this._x = value;
  }

  set y (value: number) {
    this._y = value;
  }

  set text (value: string) {
    this._value = value;
  }

  get style () {
    return this._style;
  }

  animation () {
    return this._animation;
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
