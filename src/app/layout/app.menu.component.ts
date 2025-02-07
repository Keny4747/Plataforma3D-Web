import { OnInit } from '@angular/core';
import { Component, ChangeDetectorRef } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../auth/shared/auth.service';
import { UsuariosService } from '../admin/usuarios/shared/usuarios.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styleUrls: ['./style-personalizado.scss']
})
export class AppMenuComponent implements OnInit {


  fullName: string | null = null;
  model: any[] = [];
  sidebarClass: string = 'sidebar-default';

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,

  ) { }

  ngOnInit() {
    this.fullName = this.authService.getFullName();
    const role = this.authService.getRole();

    this.model = role === 'ADMIN' ? this.getAdminMenu() : this.getUserMenu();
    this.sidebarClass = role === 'ADMIN' ? 'sidebar-admin' : 'sidebar-user';

    this.cd.detectChanges();
  }

  getAdminMenu() {
      return [
          {
              label: 'Perfil',
              items: [
                  { label: 'Usuario', icon: 'pi pi-fw pi-user', routerLink: ['/perfil-usuario'] }
              ]
          },
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
                            routerLink: ['/estudiantes']
                        },
                        {
                            label: 'Contenido Adicional', icon: 'pi pi-fw pi-bookmark',
                            items: [
                                {
                                  label: 'Subir Contenido Adicional',
                                  icon: 'pi pi-fw pi-plus',
                                  routerLink: ['/cargar-contenido-adicional']
                                },
                                {
                                  label: 'Administrar Contenido Adicional',
                                  icon: 'pi pi-fw pi-list-check',
                                  routerLink: ['/listar-contenido-adicional']
                                }
                            ]
                        }
                    ]
                },
                { label: 'Reporte Estudiante', icon: 'pi pi-fw pi-file-pdf', routerLink: ['/uikit/formlayout'] },
                { label: 'Contenido 3D', icon: 'pi pi-fw pi-video', routerLink: ['/uikit/formlayout'] },
                { label: 'Contenido Adicional', icon: 'pi pi-fw pi-book', routerLink: ['/home-contenido-adicional'] }
              ]
          }
      ];
  }

  getUserMenu() {
      return [
          {
              label: 'Perfil',
              items: [
                  { label: 'Usuario', icon: 'pi pi-fw pi-user', routerLink: ['/perfil-usuario'] }
              ]
          },
          {
              label: 'Menu principal',
              items: [
                { label: 'Contenido 3D', icon: 'pi pi-fw pi-video', routerLink: ['/uikit/formlayout'] },
                  { label: 'Contenido Adicional', icon: 'pi pi-fw pi-book', routerLink: ['/home-contenido-adicional'] }

              ]
          }
      ];
  }
}
