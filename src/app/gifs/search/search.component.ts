import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('searchText') searchText!: ElementRef<HTMLInputElement>; //not-null assertion operator

  search( searchTerm: string ) {
    const value = this.searchText.nativeElement.value;
    this.searchText.nativeElement.value = '';
  }

}
