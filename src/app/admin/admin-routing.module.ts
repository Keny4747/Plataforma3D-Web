import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteNewComponent } from './usuarios/docente-new/docente-new.component';
import { EstudianteListComponent } from './usuarios/estudiante-list/estudiante-list.component';
import { EstudianteNewComponent } from './usuarios/estudiante-new/estudiante-new.component';
import { AppLayoutComponent } from '../layout/app.layout.component';

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
        path: 'estudiante/new',
        component: EstudianteNewComponent
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
