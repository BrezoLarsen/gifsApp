import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  get record(): string[] {
    return this.gifsService.record;
  }

  constructor(private gifsService: GifsService) { }

  searchItem(searchTerm: string) {
    this.gifsService.searchedGifs(searchTerm);
  }

}
