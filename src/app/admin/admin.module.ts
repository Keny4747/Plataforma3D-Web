import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EstudianteListComponent } from './usuarios/estudiante-list/estudiante-list.component';
import { AppLayoutModule } from '../layout/app.layout.module';

import { PrimeModule } from '../prime/prime.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CargarContenidoAdicionalComponent } from './contenido-adicional/cargar-contenido-adicional/cargar-contenido-adicional.component';
import { ListarContenidoAdicionalComponent } from './contenido-adicional/listar-contenido-adicional/listar-contenido-adicional.component';
import { FileUploadModule } from 'primeng/fileupload';
import { EditarContenidoAdicionalComponent } from './contenido-adicional/editar-contenido-adicional/editar-contenido-adicional.component';
import { ApiImgPipePipe } from '../shared/api-img-pipe.pipe';
import { EstudianteDetailComponent } from './usuarios/estudiante-detail/estudiante-detail.component';
import { UsuarioDetailComponent } from './usuarios/usuario-detail/usuario-detail.component';




@NgModule({
  declarations: [

    EstudianteListComponent,
    AdminLayoutComponent,
    CargarContenidoAdicionalComponent,
    ListarContenidoAdicionalComponent,
    EditarContenidoAdicionalComponent,
    ApiImgPipePipe,
    EstudianteDetailComponent,
    UsuarioDetailComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    PrimeModule,
    ReactiveFormsModule,
    FileUploadModule

  ]
})
export class AdminModule { }
