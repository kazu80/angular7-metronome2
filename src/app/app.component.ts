import { Component } from '@angular/core';
import {MainService} from './service/main.service';
import {PixiService} from './service/pixi/pixi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [
    MainService,
    PixiService
  ]
})
export class AppComponent {
  private isMobile: boolean;

  constructor() {
    this.isMobile = false;
  }

  handleMediaQuery(match) {
    /**
     * 初回時に２回反応する。
     * emit側は１回しか呼ばれていない
     */
    this.isMobile = !match;
  }
}
