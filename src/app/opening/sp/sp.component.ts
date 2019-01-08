import {Component, ElementRef, OnInit} from '@angular/core';
import {MainService} from '../../service/main.service';
import {PixiService} from '../../service/pixi.service';

@Component({
  selector   : 'app-opening-sp',
  templateUrl: './sp.component.html',
  styleUrls  : ['./sp.component.scss']
})
export class SpComponent implements OnInit {
  private _el: HTMLElement;

  constructor(
    el: ElementRef,
    private mainService: MainService,
    private pixiService: PixiService
  ) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
    // Set Event
    this.eventOfMode();

    // Set Mode - stage0
    this.mainService.setModeSP('stage0');
  }

  eventOfMode() {
    this.mainService.modeSP.subscribe((mode: string) => {
      switch (mode) {
        case '':
          break;
      }
    });

    this.pixiService.modeSP.subscribe((mode: string) => {
      switch (mode) {
        case '':
          break;
      }
    });
  }
}
