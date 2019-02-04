import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {PixiCircle, PixiImage, PixiRect, PixiText} from './pixi.methods';
import {PixiSound} from './pixi.sound';

@Injectable({
  providedIn: 'root'
})
export class PixiService {
  private _mode: Subject<any>;
  private _modeSP: Subject<any>;
  private _device: string;

  public mode: Observable<any>;
  public modeSP: Observable<any>;

  constructor() {
    this._mode = new Subject();
    this._modeSP = new Subject();
    this.mode = this._mode.asObservable();
    this.modeSP = this._modeSP.asObservable();
  }

  setMode(value: string) {
    if (this.device === 'sp') {
      this._modeSP.next(value);
    } else {
      this._mode.next(value);
    }
  }

  getMode() {
    if (this.device === 'sp') {
      return this.modeSP;
    } else {
      return this.mode;
    }
  }

  text (): PixiText {
    return new PixiText(this);
  }

  rect(): PixiRect {
    return new PixiRect(this);
  }

  circle(): PixiCircle {
    return new PixiCircle(this);
  }

  image(): PixiImage {
    return new PixiImage(this);
  }

  sound(): PixiSound {
    return new PixiSound();
  }

  get device(): string {
    return this._device;
  }

  set device(value: string) {
    this._device = value;
  }
}
