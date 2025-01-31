import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteNewComponent } from './usuarios/docente-new/docente-new.component';
import { EstudianteListComponent } from './usuarios/estudiante-list/estudiante-list.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { CargarContenidoAdicionalComponent } from './contenido-adicional/cargar-contenido-adicional/cargar-contenido-adicional.component';
import { ListarContenidoAdicionalComponent } from './contenido-adicional/listar-contenido-adicional/listar-contenido-adicional.component';
import { EditarContenidoAdicionalComponent } from './contenido-adicional/editar-contenido-adicional/editar-contenido-adicional.component';
import { ContenidoListarHomeComponent } from '../home/contenido-listar-home/contenido-listar-home.component';

const routes: Routes = [

  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'estudiantes',
        component: EstudianteListComponent
      },
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
      {
        path:'docente',
        component:DocenteNewComponent
      }
      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
