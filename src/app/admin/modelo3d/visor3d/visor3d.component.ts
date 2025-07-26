import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-visor3d',
  templateUrl: './visor3d.component.html',
  styleUrls: ['./visor3d.component.scss']
})
export class Visor3dComponent {
 @ViewChild('dropZone') dropZone!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  currentModel: any = null;
  loadStartTime: number = 0;
  modelLoaded: boolean = false;
  isLoading: boolean = false;
  isDragOver: boolean = false;

  // Información del modelo
  modelData = {
    fileName: '',
    fileSize: '',
    loadTime: ''
  };

  private eventListeners: Array<() => void> = [];

  ngAfterViewInit() {
    this.loadModelViewerScript();
    setTimeout(() => {
      this.setupEventListeners();
    }, 100);
  }

  ngOnDestroy() {
    // Limpiar event listeners
    this.eventListeners.forEach(cleanup => cleanup());

    // Limpiar modelo actual
    if (this.currentModel) {
      URL.revokeObjectURL(this.currentModel.src);
      this.currentModel.remove();
    }
  }

  private loadModelViewerScript() {
    if (!document.querySelector('script[src*="model-viewer"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }

  private setupEventListeners() {
    const dropZoneEl = this.dropZone.nativeElement;
    const fileInputEl = this.fileInput.nativeElement;

    // Prevenir comportamiento por defecto
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const highlight = () => this.isDragOver = true;
    const unhighlight = () => this.isDragOver = false;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZoneEl.addEventListener(eventName, preventDefaults);
      document.body.addEventListener(eventName, preventDefaults);

      this.eventListeners.push(() => {
        dropZoneEl.removeEventListener(eventName, preventDefaults);
        document.body.removeEventListener(eventName, preventDefaults);
      });
    });

    // Efectos visuales
    dropZoneEl.addEventListener('dragenter', highlight);
    dropZoneEl.addEventListener('dragover', highlight);
    dropZoneEl.addEventListener('dragleave', unhighlight);
    dropZoneEl.addEventListener('drop', unhighlight);

    this.eventListeners.push(
      () => dropZoneEl.removeEventListener('dragenter', highlight),
      () => dropZoneEl.removeEventListener('dragover', highlight),
      () => dropZoneEl.removeEventListener('dragleave', unhighlight),
      () => dropZoneEl.removeEventListener('drop', unhighlight)
    );

    // Manejar drop y file select
    const handleDrop = (e: DragEvent) => {
      const files = e.dataTransfer?.files;
      if (files) this.handleFiles(files);
    };

    const handleFileSelect = (e: Event) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) this.handleFiles(files);
    };

    dropZoneEl.addEventListener('drop', handleDrop);
    fileInputEl.addEventListener('change', handleFileSelect);

    this.eventListeners.push(
      () => dropZoneEl.removeEventListener('drop', handleDrop),
      () => fileInputEl.removeEventListener('change', handleFileSelect)
    );
  }

  onDropZoneClick() {
    if (!this.modelLoaded) {
      this.fileInput.nativeElement.click();
    }
  }

  onBrowseClick() {
    this.fileInput.nativeElement.click();
  }

  private handleFiles(files: FileList) {
    if (files.length > 0) {
      const file = files[0];
      if (this.isValidModelFile(file)) {
        this.loadModel(file);
      } else {
        alert('Por favor selecciona un archivo GLB o GLTF válido.');
      }
    }
  }

  private isValidModelFile(file: File): boolean {
    const validExtensions = ['.glb', '.gltf'];
    return validExtensions.some(ext =>
      file.name.toLowerCase().endsWith(ext)
    );
  }

  private loadModel(file: File) {
    this.loadStartTime = Date.now();
    this.isLoading = true;

    const url = URL.createObjectURL(file);

    // Limpiar modelo anterior
    if (this.currentModel) {
      URL.revokeObjectURL(this.currentModel.src);
      this.currentModel.remove();
    }

    // Crear nuevo model-viewer
    this.currentModel = document.createElement('model-viewer');
    this.currentModel.setAttribute('src', url);
    this.currentModel.setAttribute('alt', 'Modelo 3D');
    this.currentModel.setAttribute('auto-rotate', '');
    this.currentModel.setAttribute('camera-controls', '');
    this.currentModel.setAttribute('shadow-intensity', '1');
    this.currentModel.setAttribute('exposure', '1');
    this.currentModel.setAttribute('shadow-softness', '0.5');

    // Event listeners del modelo
    this.currentModel.addEventListener('load', () => {
      const loadTime = Date.now() - this.loadStartTime;
      this.showModelLoaded(file, loadTime);
    });

    this.currentModel.addEventListener('error', () => {
      this.isLoading = false;
      alert('Error al cargar el modelo. Verifica que el archivo sea válido.');
    });

    // Agregar al DOM
    this.dropZone.nativeElement.innerHTML = '';
    this.dropZone.nativeElement.appendChild(this.currentModel);
    this.modelLoaded = true;
  }

  private showModelLoaded(file: File, loadTime: number) {
    this.isLoading = false;

    this.modelData = {
      fileName: file.name,
      fileSize: this.formatFileSize(file.size),
      loadTime: `${loadTime}ms`
    };
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  resetViewer() {
    if (this.currentModel) {
      URL.revokeObjectURL(this.currentModel.src);
      this.currentModel.remove();
      this.currentModel = null;
    }

    this.modelLoaded = false;
    this.isLoading = false;
    this.modelData = { fileName: '', fileSize: '', loadTime: '' };
    this.fileInput.nativeElement.value = '';
  }
}
