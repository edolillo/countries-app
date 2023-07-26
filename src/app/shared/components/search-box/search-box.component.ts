import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription$?: Subscription;
  @ViewChild('txtSearchInput') textSearchInput!: ElementRef<HTMLInputElement>;
  @Input() placeholder!: string;
  @Input() lastSearchText: string = '';
  @Output() searchText = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubscription$ = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => this.searchText.emit(value));
  }

  ngOnDestroy(): void {
    this.debouncerSubscription$?.unsubscribe();
  }

  // onValue():void {
  //   const searchText = this.textSearchInput.nativeElement.value;
  //   console.log('searchText', searchText);
  //   this.searchText.emit(searchText);
  // }

  onKeyPress(searchText: string) {
    this.debouncer.next(searchText);
  }
}
