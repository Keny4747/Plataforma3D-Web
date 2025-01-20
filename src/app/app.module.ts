import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstudianteListComponent } from './admin/usuarios/estudiante-list/estudiante-list.component';
import { DocenteNewComponent } from './admin/usuarios/docente-new/docente-new.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './layout/app.layout.module';
@NgModule({
  declarations: [
    AppComponent,
    EstudianteListComponent,
    DocenteNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppLayoutModule,
    BrowserAnimationsModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
