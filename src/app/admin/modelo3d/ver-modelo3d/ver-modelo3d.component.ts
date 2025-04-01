import { Component, OnInit } from '@angular/core';
import { Book } from '../../contenido-adicional/shared/book.model';
import { ActivatedRoute } from '@angular/router';
import { Modelo3dService } from '../shared/modelo3d.service';
import { Modelo3D } from '../shared/modelo3d.model';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-modelo3d',
  templateUrl: './ver-modelo3d.component.html',
  styleUrls: ['./ver-modelo3d.component.scss']
})
export class VerModelo3dComponent implements OnInit {
  modeloId: number | null = null;
  currentModelo: Modelo3D | null = null;
  safeEmbedUrl: SafeResourceUrl | null = null;
  loadError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private modelo3dService: Modelo3dService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.modeloId = +this.route.snapshot.paramMap.get('id')!;

    if (this.modeloId) {
      this.modelo3dService.get(this.modeloId).subscribe({
        next: (modelo) => {
          this.currentModelo = modelo;
          this.safeEmbedUrl = this.generateSafeEmbedUrl(modelo.embedCode ?? '');
        },
        error: () => this.loadError = true
      });
    }
  }

  private generateSafeEmbedUrl(sketchfabUrl: string): SafeResourceUrl {
    // Convierte la URL pública en URL de embed
    const embedUrl = sketchfabUrl.replace('/models/', '/models/') + '/embed';
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

}
