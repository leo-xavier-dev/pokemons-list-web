import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

import { NgApexchartsModule } from "ng-apexcharts";

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';

import { MostWantedComponent } from '../components/most-wanted/most-wanted.component';
import { CardPokemonComponent } from '../components/card-pokemon/card-pokemon.component';
import { PokedexComponent } from '../components/pokedex/pokedex.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HomeComponent,
    MostWantedComponent,
    CardPokemonComponent,
    PokedexComponent,
    SidebarComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,

    HomeRoutingModule,

    CarouselModule,
    ButtonModule,
    SidebarModule,
    ToastModule

  ]
})
export class HomeModule { }