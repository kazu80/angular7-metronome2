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
  private _boundMQHandler: any;

  constructor(el: ElementRef) {
    this._el             = el.nativeElement;
    this._boundMQHandler = () => {
      return this.queryHandler(this._mq);
    };
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

  _add() {
    if (this._mq) {
      this._mq.addListener(this._boundMQHandler);
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
    this._add();
    this.queryHandler(this._mq);
  }

  queryHandler(mq: MediaQueryList) {
    /**
     * 初回時に２回emitされる
     */
    this.queryMatches.emit(mq.matches);
  }
}
