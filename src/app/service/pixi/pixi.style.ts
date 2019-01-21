export class PixiStyle {
  private _fontSize: string;
  private _fontWeight: string;
  private _fontFamily: string;
  private _color: string;
  private _align: string;
  private _width: number;
  private _height: number;
  private _radius: number;
  private _alpha: number;
  private _zIndex: number;

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

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }

  get alpha(): number {
    return this._alpha || 1;
  }

  set alpha(value: number) {
    this._alpha = value;
  }

  get zIndex(): number {
    return this._zIndex;
  }

  set zIndex(value: number) {
    this._zIndex = value;
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
