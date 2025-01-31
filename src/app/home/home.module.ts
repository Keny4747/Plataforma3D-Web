import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoListarHomeComponent } from './contenido-listar-home/contenido-listar-home.component';
import { PrimeModule } from '../prime/prime.module';



@NgModule({
  declarations: [
    ContenidoListarHomeComponent
  ],
  imports: [
    CommonModule,
    PrimeModule
  ]
})
export class HomeModule { }
