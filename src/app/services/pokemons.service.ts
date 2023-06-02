import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokemons.models';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(
    private _http: HttpClient
  ) { }

  public getPokemon(id: number | string): Observable<Pokemon> {
    return this._http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  }
}
