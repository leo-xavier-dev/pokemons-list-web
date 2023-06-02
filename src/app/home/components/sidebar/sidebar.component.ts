import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import { Pokemon } from 'src/app/models/pokemons.models';
import { PokemonsService } from 'src/app/services/pokemons.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  loaded: boolean = false;
  pokemon: Pokemon | undefined;

  @Input() pokemonId: string | any;

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(
    private _pokemonService: PokemonsService
  ) {
    
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(): void {
    this._pokemonService.getPokemon(this.pokemonId).subscribe({
      next: (pokemon: Pokemon) => {
        this.pokemon = pokemon;
        this.stackGraphy(pokemon.stats, pokemon.name);
      },
      error: (erro: any) => {

      }
    });
  }

  stackGraphy(status: any, name: string): void {

    this.fillGraphy(status).then((stats: any) => {

      this.chartOptions = {
        series: [
          {
            name: name,
            data: stats
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5
          }
        },
        xaxis: {
          categories: [
            "Hp",
            "Attack",
            "Defense",
            "Special-attack",
            "Special-defense",
            "Speed"
          ]
        }
      };

      setTimeout(() => { this.loaded = true; }, 3000);
    });
  }

  fillGraphy(status: any) {
    return new Promise((resolve, reject) => {
      let stats: any[] = [];
      status.forEach((element: any) => {
        stats.push(element.base_stat);
      });
      resolve(stats);
    });
  }

  getWeight(weight: number | undefined): number | undefined {
    return (weight) ? weight / 100 : undefined;
  }

}
