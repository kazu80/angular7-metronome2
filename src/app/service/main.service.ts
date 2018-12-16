import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private _mode: Subject;
  public mode: Observable;

  constructor() {
    this._mode = new Subject();
    this.mode = this._mode.asObservable();
  }

  setMode (value: string) {
    this._mode.next(value);
  }
}
