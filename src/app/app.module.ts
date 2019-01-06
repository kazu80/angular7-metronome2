import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PcComponent } from './opening/pc/pc.component';
import {StatsComponent} from './opening/stats/stats.component';
import {MediaQueryComponent} from './media-query/media-query.component';
import {SpComponent} from './opening/sp/sp.component';

@NgModule({
  declarations: [
    AppComponent,
    PcComponent,
    StatsComponent,
    MediaQueryComponent,
    SpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
