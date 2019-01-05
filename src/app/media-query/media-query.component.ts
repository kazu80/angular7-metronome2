import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

/**
 * media-query components
 * Reference : https://github.com/PolymerElements/iron-media-query
 */
@Component({
  selector   : 'app-media-query',
  templateUrl: './media-query.component.html',
  styleUrls  : ['./media-query.component.scss']
})
export class MediaQueryComponent implements OnInit, OnChanges {
  @Input() query: string;
  @Input() full: boolean;
  @Output() queryMatches: EventEmitter<any> = new EventEmitter();

  private _el: HTMLElement;
  private _mq: MediaQueryList;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;
  }

  ngOnInit() {
    this._el.style.display = 'none';
    this.queryMatches.emit();

    this.queryChanged();
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('query')) {
      this.queryChanged();
    }
  }

  queryChanged() {
    // this._remove();
    let query = this.query;

    if (!query) {
      return;
    }

    if (!this.full && query[0] !== '(') {
      query = '(' + query + ')';
    }

    this._mq = window.matchMedia(query);
    // this._add();
    // this.queryHandler(this._mq);
  }
}
