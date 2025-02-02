import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteListComponent } from './usuarios/estudiante-list/estudiante-list.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { CargarContenidoAdicionalComponent } from './contenido-adicional/cargar-contenido-adicional/cargar-contenido-adicional.component';
import { ListarContenidoAdicionalComponent } from './contenido-adicional/listar-contenido-adicional/listar-contenido-adicional.component';
import { EditarContenidoAdicionalComponent } from './contenido-adicional/editar-contenido-adicional/editar-contenido-adicional.component';
import { ContenidoListarHomeComponent } from '../home/contenido-listar-home/contenido-listar-home.component';
import { EstudianteDetailComponent } from './usuarios/estudiante-detail/estudiante-detail.component';

const routes: Routes = [

  {
    path: '',
    component: AppLayoutComponent,
    children: [
      //ruta del estudiante
      {
        path: 'estudiantes',
        component: EstudianteListComponent
      },
      {
        path: 'detalle-estudiante/:id',
        component: EstudianteDetailComponent
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


      ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
