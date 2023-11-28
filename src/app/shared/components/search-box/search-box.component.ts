import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject();
  private debouncerSubcription?: Subscription;

  @Input()
  public initialValue: string = '';

  @Input()
  public placeholder: string = '';

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  @ViewChild('txtSearchInput')
  public txtTagInput!: ElementRef<HTMLInputElement>;

  emitValue(): void {
    this.onValue.emit(this.txtTagInput.nativeElement.value);
  }

  onKeyPress(term: string) {
    this.debouncer.next(term);
  }

  ngOnInit(): void {
    this.debouncerSubcription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      })
  }

  ngOnDestroy(): void {
    this.debouncerSubcription?.unsubscribe();
  }
}
