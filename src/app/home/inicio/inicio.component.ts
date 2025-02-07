import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  fullName: string | null = null;

  constructor(private userService: AuthService) { }

  ngOnInit(): void {
    this.fullName = this.userService.getFullName();
  }
}
