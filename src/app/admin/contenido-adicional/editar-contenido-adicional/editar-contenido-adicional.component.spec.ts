import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContenidoAdicionalComponent } from './editar-contenido-adicional.component';

describe('EditarContenidoAdicionalComponent', () => {
  let component: EditarContenidoAdicionalComponent;
  let fixture: ComponentFixture<EditarContenidoAdicionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarContenidoAdicionalComponent]
    });
    fixture = TestBed.createComponent(EditarContenidoAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
