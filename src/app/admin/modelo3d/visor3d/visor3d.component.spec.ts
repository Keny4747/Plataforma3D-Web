import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Visor3dComponent } from './visor3d.component';

describe('Visor3dComponent', () => {
  let component: Visor3dComponent;
  let fixture: ComponentFixture<Visor3dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Visor3dComponent]
    });
    fixture = TestBed.createComponent(Visor3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
