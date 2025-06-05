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
    this.loadChatbot();
    this.modeloId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.modeloId) {
      this.modelo3dService.get(this.modeloId).subscribe({
        next: (modelo) => {
          this.currentModelo = modelo;

          if (modelo.esExterno && modelo.embedCode) {
            this.safeEmbedUrl = this.generateSafeEmbedUrl(modelo.embedCode);
          }
        },
        error: () => (this.loadError = true)
      });
    }
  }
  ngOnDestroy(): void {
    this.removeChatbot(); // Limpia cuando sales del componente
  }

  private generateSafeEmbedUrl(sketchfabUrl: string): SafeResourceUrl {

    const embedUrl = sketchfabUrl.replace('/models/', '/models/') + '/embed';
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  loadChatbot() {
    const script = document.createElement('script');
    script.src = 'https://mdws2yxlcze4iturdcil436v.agents.do-ai.run/static/chatbot/widget.js';
    script.async = true;
    script.setAttribute('data-agent-id', 'cc469c59-1e63-11f0-bf8f-4e013e2ddde4');
    script.setAttribute('data-chatbot-id', 'YO3UYsGA2_czJsi2YuxyBggXCbk_HMhM');
    script.setAttribute('data-name', 'Asistente Educativo Jesus María Chatbot');
    script.setAttribute('data-primary-color', '#031B4E');
    script.setAttribute('data-secondary-color', '#E5E8ED');
    script.setAttribute('data-button-background-color', '#0061EB');
    script.setAttribute('data-starting-message', 'Hello! How can I help you today?');
    script.setAttribute('data-logo', '/static/chatbot/icons/default-agent.svg');
    document.body.appendChild(script);
  }
  removeChatbot() {
    const existingScript = document.getElementById('chatbot-script');
    if (existingScript) {
      existingScript.remove();
    }

    // También elimina el botón flotante del DOM si es necesario
    const widget = document.querySelector('[id^="doai-chatbot-widget"]');
    if (widget) {
      widget.remove();
    }
  }

}
