import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemons.models';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  @Input() search$: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() openSideBarById: string | null = "";

  responsiveOptions: any;
  pokemonsListPokedex: Pokemon[] = [];
  pokemonsListColumn: Pokemon[] = [];

  display: boolean = false;
  isError: boolean = false;
  pokemonId: any;

  count: number = 20;
  page: number = 0;

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
        numVisible: 5,
        numScroll: 5
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

    if (this.openSideBarById) {
      this.openSideBar(this.openSideBarById);
    }

    this.initPokemonCount();
    this.primengConfig.ripple = true;

    this.search$.subscribe({
      next: (value: string) => {
        if (value) {
          this.pokemonsListPokedex = [];
          this.getPokemon(value);
        } else {
          this.count = 20;
          this.page = 0;
          this.pokemonsListPokedex = [];
          this.initPokemonCount();
        }
      }
    });
  }

  initPokemonCount(): void {
    for (let i = this.page; i < this.count; i++) {
      const valor = i + 1;
      this.getPokemon(valor);
    }
  }

  getPokemon(id: number | string): void {
    this._pokemonsService.getPokemon(id).subscribe({
      next: (pokemon: Pokemon) => {
        this.isError = false;
        if (pokemon.sprites.other?.dream_world.front_default) {
          this.pokemonsListPokedex.push(pokemon);
        }
      },
      error: (error: any) => {
        this.isError = true;
      }
    });
  }

  openSideBar(event: any) {
    this._router.navigate(['/pokemon', event]);
    this.pokemonId = event;
    this.display = true;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if (window.scrollY >= window.innerHeight) {
      this.count = this.count + 20;
      this.page = this.page + 20;
      if (this.count <= 60) {
        this.initPokemonCount();
      }
    }
  }
}
