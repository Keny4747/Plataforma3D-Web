import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteNewComponent } from './usuarios/docente-new/docente-new.component';
import { EstudianteListComponent } from './usuarios/estudiante-list/estudiante-list.component';
import { AppLayoutComponent } from '../layout/app.layout.component';
import { CargarContenidoAdicionalComponent } from './contenido-adicional/cargar-contenido-adicional/cargar-contenido-adicional.component';

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
        path: 'cargar-contenido-adicional',
        component: CargarContenidoAdicionalComponent

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
