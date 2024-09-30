import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddUsuario } from './modal-add-usuario.component';

describe('ModalAddUsuario', () => {
  let component: ModalAddUsuario;
  let fixture: ComponentFixture<ModalAddUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddUsuario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddUsuario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
