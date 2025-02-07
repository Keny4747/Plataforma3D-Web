import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoListarHomeComponent } from './contenido-listar-home/contenido-listar-home.component';
import { PrimeModule } from '../prime/prime.module';
import { ImagenPipe } from './shared/imagen.pipe';
import { InicioComponent } from './inicio/inicio.component';
import { CapitalizarPipe } from '../shared/capitalizar.pipe';



@NgModule({
  declarations: [
    ContenidoListarHomeComponent,
    ImagenPipe,
    InicioComponent

  ],
  imports: [
    CommonModule,
    PrimeModule
  ]
})
export class HomeModule { }
