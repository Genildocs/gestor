import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaDeAfazeresRoutingModule } from './lista-de-afazeres-routing.module';
import { ListaDeAfazeresComponent } from './lista-de-afazeres.component';


@NgModule({
  declarations: [
    ListaDeAfazeresComponent
  ],
  imports: [
    CommonModule,
    ListaDeAfazeresRoutingModule
  ]
})
export class ListaDeAfazeresModule { }
