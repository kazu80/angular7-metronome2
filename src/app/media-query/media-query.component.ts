import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';

/**
 * media-query components
 * Reference : https://github.com/PolymerElements/iron-media-query
 */
@Component({
  selector   : 'app-media-query',
  templateUrl: './media-query.component.html',
  styleUrls  : ['./media-query.component.scss']
})
export class MediaQueryComponent implements OnInit {
  @Output() queryMatches: EventEmitter<any> = new EventEmitter();

  private _el: HTMLElement;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
    this._el.style.display = 'none';
  }

}
