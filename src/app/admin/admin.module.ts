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

import { ListarModelo3dComponent } from './modelo3d/listar-modelo3d/listar-modelo3d.component';
import { CargarModelo3dComponent } from './modelo3d/cargar-modelo3d/cargar-modelo3d.component';
import { VerModelo3dComponent } from './modelo3d/ver-modelo3d/ver-modelo3d.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ImgModelos3dPipe } from '../shared/img-modelos3d.pipe';
import { EditarModelo3dComponent } from './modelo3d/editar-modelo3d/editar-modelo3d.component';


@NgModule({
  declarations: [

    EstudianteListComponent,
    AdminLayoutComponent,
    CargarContenidoAdicionalComponent,
    ListarContenidoAdicionalComponent,
    EditarContenidoAdicionalComponent,
    ApiImgPipePipe,
    EstudianteDetailComponent,
    UsuarioDetailComponent,
    ListarModelo3dComponent,
    CargarModelo3dComponent,
    VerModelo3dComponent,
    ImgModelos3dPipe,
    EditarModelo3dComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    PrimeModule,
    ReactiveFormsModule,
    FileUploadModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
