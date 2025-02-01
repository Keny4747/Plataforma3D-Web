import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { ConfirmPopup } from 'primeng/confirmpopup';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService, MessageService]
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    itemsUser: MenuItem[] | undefined;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      public router: Router,
      public authService: AuthService

    ) { }

    ngOnInit() {
      this.itemsUser = [
          {
              label: 'Perfil',
              items: [

                  {
                      label: 'Cerrar Sesión',
                      icon: 'pi pi-sign-out'
                  }
              ]
          }
      ];
  }
  confirm(event: Event) {
    this.confirmationService.confirm({
        key: 'confirm',
        target: event.target || new EventTarget,
        message: 'Estás seguro de cerrar sesión?',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log('You have accepted');
        },
        reject: () => {
          console.log('You have rejected');
        }
    });
  }

}

