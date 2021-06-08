import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../gifs/interfaces/gif.interface';

@Injectable({
  providedIn: 'root' // Esto indica que es un servicio global y evitamos declararlo en los providers
})
export class GifsService {

  private _record: string[] = [];
  private apiKey: string = "1qUOm0RZOaYrVXu3jJJhX3oVtCKXpPnZ";
  private apiUrl: string = 'https://api.giphy.com/v1/gifs';

  public results: Gif[] = [];

  get record() {
    return [...this._record];
  }

  constructor(private httpService: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('historial')!) || []; // JSON.parse convierte en array una sucesión de strings
    this.results = JSON.parse(localStorage.getItem('lastSearch')!) || [];
  }

  searchedGifs(query: string) {
    query = query.trim().toLowerCase(); // eliminamos espacios delante y detrás + evitamos duplicados basados en mayus/minus

    if(!this._record.includes(query)) { // evitamos que se incluyan en el array elementos duplicados
      this._record.unshift(query);      
      this._record = this._record.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._record)); // JSON.stringify convierte un objeto/array en strings
    }

    // En puro JS lo haríamos así:
    /* fetch('https://api.giphy.com/v1/gifs/search?api_key=1qUOm0RZOaYrVXu3jJJhX3oVtCKXpPnZ&q=dragon ball').then(resp => {
      resp.json().then(data => {
        console.log(data);
      })
    }) */

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    //En Angular lo hacemos con HTTPClient:
    this.httpService.get<SearchGifsResponse>(`${this.apiUrl}/search?`, { params })
    .subscribe(( resp ) => {
      console.log(resp);
      this.results = resp.data;
      localStorage.setItem('lastSearch', JSON.stringify(this.results));
    })

  }

  //Con el método async quedaría así
  /*async searchedGifs(query: string) {
    query = query.trim().toLowerCase(); // eliminamos espacios delante y detrás + evitamos duplicados basados en mayus/minus

    if(!this._record.includes(query)) { // evitamos que se incluyan en el array elementos duplicados
      this._record.unshift(query);      
      this._record = this._record.splice(0, 10);
    }

    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=1qUOm0RZOaYrVXu3jJJhX3oVtCKXpPnZ&q=dragon ball');
    const data = await resp.json();

    console.log(data);
  }*/

  
}