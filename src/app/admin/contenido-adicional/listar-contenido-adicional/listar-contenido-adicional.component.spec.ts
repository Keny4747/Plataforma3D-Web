import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContenidoAdicionalComponent } from './listar-contenido-adicional.component';

describe('ListarContenidoAdicionalComponent', () => {
  let component: ListarContenidoAdicionalComponent;
  let fixture: ComponentFixture<ListarContenidoAdicionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarContenidoAdicionalComponent]
    });
    fixture = TestBed.createComponent(ListarContenidoAdicionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
