import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemons.models';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss']
})
export class CardPokemonComponent implements OnInit {

  @Input() pokemon: Pokemon | undefined;
  @Output() open: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    // console.log(this.pokemon)
  }

  getWeight(weight: number | undefined): number | undefined {
    return (weight) ? weight / 100 : undefined;
  }

  onClickCard(id: any): void {
    this.open.emit(id);
  }

}
