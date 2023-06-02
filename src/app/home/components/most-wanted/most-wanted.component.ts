import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Pokemon } from 'src/app/models/pokemons.models';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-most-wanted',
  templateUrl: './most-wanted.component.html',
  styleUrls: ['./most-wanted.component.scss']
})
export class MostWantedComponent implements OnInit {

  responsiveOptions: any;
  pokemonsList: Pokemon[] = [];
  display: boolean = false;

  pokemonId: any;

  produtoLista: any[] = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Bamboo Watch",
      description: "Product Description",
      image: "bamboo-watch.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5
    }    
  ];

  constructor(
    private _pokemonsService: PokemonsService,
    private primengConfig: PrimeNGConfig,
    private _router: Router
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 6,
        numScroll: 6
      },
      {
        breakpoint: '768px',
        numVisible: 4,
        numScroll: 4
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    for (let i = 0; i < 30; i++) {
      const valor = Math.floor(Math.random() * 1008) + 1;
      this.getPokemon(valor);
    }

    this.primengConfig.ripple = true;
  }

  getPokemon(id: number): void {
    this._pokemonsService.getPokemon(id).subscribe({
      next: (pokemon: Pokemon) => {
        if (pokemon.sprites.other?.dream_world.front_default) {
          this.pokemonsList.push(pokemon);
        }
      }
    });
  }

  openSideBar(event: any) {
    this.pokemonId = event;
    this.display = true;
    this._router.navigate(['/pokemon', event]);
  }

}
