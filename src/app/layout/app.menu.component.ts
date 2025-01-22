import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Perfil',
                items: [
                    { label: 'Usuario', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },

            //sidebar del docente
            {
                label: 'Menu principal',
                items: [
                    { label: 'Resumen', icon: 'pi pi-fw pi-gauge', routerLink: ['/uikit/formlayout'] },
                    {
                      label: 'Panel de Control',
                      icon: 'pi pi-fw pi-cog',
                      items: [
                          {
                              label: 'Estudiantes',
                              icon: 'pi pi-fw pi-users',
                              routerLink: ['/admin/estudiantes']
                          },
                          {
                              label: 'Subir Contenido Adicional',
                              icon: 'pi pi-fw pi-file-plus',
                              routerLink: ['/auth/error']
                          }
                      ]
                  },
                  { label: 'Reporte Estudiante', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/uikit/formlayout'] },
                  { label: 'Contenido 3D', icon: 'pi pi-fw pi-video', routerLink: ['/uikit/formlayout'] },
                  { label: 'Contenido Adicional', icon: 'pi pi-fw pi-book', routerLink: ['/uikit/formlayout'] }
                ]
            }

            //sidebar del estudiante


        ];
    }
}
