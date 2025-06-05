import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteListComponent } from './usuarios/estudiante-list/estudiante-list.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { CargarContenidoAdicionalComponent } from './contenido-adicional/cargar-contenido-adicional/cargar-contenido-adicional.component';
import { ListarContenidoAdicionalComponent } from './contenido-adicional/listar-contenido-adicional/listar-contenido-adicional.component';
import { EditarContenidoAdicionalComponent } from './contenido-adicional/editar-contenido-adicional/editar-contenido-adicional.component';
import { ContenidoListarHomeComponent } from '../home/contenido-listar-home/contenido-listar-home.component';
import { EstudianteDetailComponent } from './usuarios/estudiante-detail/estudiante-detail.component';

import { InicioComponent } from '../home/inicio/inicio.component';
import { UsuarioDetailComponent } from './usuarios/usuario-detail/usuario-detail.component';
import { CargarModelo3dComponent } from './modelo3d/cargar-modelo3d/cargar-modelo3d.component';
import { ListarModelo3dComponent } from './modelo3d/listar-modelo3d/listar-modelo3d.component';
import { VerModelo3dComponent } from './modelo3d/ver-modelo3d/ver-modelo3d.component';
import { EditarModelo3dComponent } from './modelo3d/editar-modelo3d/editar-modelo3d.component';
import { Modelo3HomeComponent } from '../home/modelo3-home/modelo3-home.component';
import { GenerarModelo3dComponent } from './modelo3d/generar-modelo3d/generar-modelo3d.component';

const routes: Routes = [

  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        component: InicioComponent
      },
      //ruta del estudiante
      {
        path: 'estudiantes',
        component: EstudianteListComponent
      },
      {
        path: 'detalle-estudiante/:id',
        component: EstudianteDetailComponent
      },
      //ruta del perfil del usuario logueado
      {
        path: 'perfil-usuario',
        component: UsuarioDetailComponent

      },
      //ruta del contenido adicional
      {
        path: 'listar-contenido-adicional',
        component: ListarContenidoAdicionalComponent
      },
      {
        path: 'cargar-contenido-adicional',
        component: CargarContenidoAdicionalComponent

      },
      {
        path: 'editar-contenido-adicional/:id',
        component: EditarContenidoAdicionalComponent
      },
      {
        path: 'home-contenido-adicional',
        component: ContenidoListarHomeComponent
      },

      //ruta del modelo 3D
      {
        path: 'modelo3d-home',
        component: Modelo3HomeComponent

      },
      {
        path: 'listar-modelos3d',
        component: ListarModelo3dComponent
      },
      {
        path: 'cargar-modelo3d',
        component: CargarModelo3dComponent

      },

      {
        path: 'detalle-modelo3d/:id',
        component: VerModelo3dComponent

      },

      {
        path: 'editar-modelo3d/:id',
        component: EditarModelo3dComponent
      },

      {
        path: 'generar-modelo3d',
        component: GenerarModelo3dComponent
      }

      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
