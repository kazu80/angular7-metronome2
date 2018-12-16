import { Component } from '@angular/core';
import {MainService} from './service/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
  providers: [
    MainService
  ]
})
export class AppComponent {

}
