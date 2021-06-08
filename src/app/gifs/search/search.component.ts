import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('searchText') searchText!: ElementRef<HTMLInputElement>; //not-null assertion operator

  constructor(private gifsService: GifsService) {}

  search( searchTerm: string ) {
    const value = this.searchText.nativeElement.value;
    this.searchText.nativeElement.value = '';

    this.gifsService.searchedGifs(value);
  }

}
