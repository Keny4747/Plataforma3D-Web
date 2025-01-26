import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DocenteNewComponent } from './usuarios/docente-new/docente-new.component';
import { EstudianteListComponent } from './usuarios/estudiante-list/estudiante-list.component';
import { AppLayoutModule } from '../layout/app.layout.module';

import { PrimeModule } from '../prime/prime.module';
import { EstudianteNewComponent } from './usuarios/estudiante-new/estudiante-new.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DocenteEditComponent } from './usuarios/docente-edit/docente-edit.component';
import { EstudianteEditComponent } from './usuarios/estudiante-edit/estudiante-edit.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DocenteNewComponent,
    EstudianteListComponent,
    EstudianteNewComponent,
    AdminLayoutComponent,
    DocenteEditComponent,
    EstudianteEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    PrimeModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
