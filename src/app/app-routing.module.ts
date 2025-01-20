import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteListComponent } from './admin/usuarios/estudiante-list/estudiante-list.component';
import { DocenteNewComponent } from './admin/usuarios/docente-new/docente-new.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
  {path:'sakai', component:AppLayoutComponent},
  {path: 'estudiante/list', component: EstudianteListComponent},
  {path: 'docentes', component: DocenteNewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
