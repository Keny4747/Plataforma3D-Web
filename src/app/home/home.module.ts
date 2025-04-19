import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContenidoListarHomeComponent } from './contenido-listar-home/contenido-listar-home.component';
import { PrimeModule } from '../prime/prime.module';
import { ImagenPipe } from './shared/imagen.pipe';
import { InicioComponent } from './inicio/inicio.component';
import { Modelo3HomeComponent } from './modelo3-home/modelo3-home.component';
import { RouterModule } from '@angular/router';
import { ImgModelos3dPipe } from '../shared/img-modelos3d.pipe';

@NgModule({
  declarations: [
    ContenidoListarHomeComponent,
    ImagenPipe,
    InicioComponent,
    Modelo3HomeComponent

  ],
  imports: [
    CommonModule,
    PrimeModule,
    RouterModule
  ]
})
export class HomeModule { }
