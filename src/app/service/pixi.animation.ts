export class PixiAnimation {
  _alpha: PixiAnimationAlpha;
  _blur: PixiAnimationBlur;
  _position: PixiAnimationPosition;
  _duration: number;
  _delay: number;

  constructor() {
    this._alpha = new PixiAnimationAlpha();
    this._blur = new PixiAnimationBlur();
    this._position = new PixiAnimationPosition();
    this._delay = 0;
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
    this.to = 1;
  }
}

export class PixiAnimationBlur extends PixiAnimationBase {
  constructor() {
    super();
    this.from = 0;
    this.to = 0;
  }
}

export class PixiAnimationPositionX extends PixiAnimationBase {
  constructor() {
    super();
    this.from = 0;
    this.to = 0;
  }
}

export class PixiAnimationPositionY extends PixiAnimationBase {
  constructor() {
    super();
    this.from = 0;
    this.to = 0;
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
