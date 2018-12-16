import { Component } from '@angular/core';
import {MainService} from './service/main.service';
import {PixiService} from './service/pixi.service';

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

}
