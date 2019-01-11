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
