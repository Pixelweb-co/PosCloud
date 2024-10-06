import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEmpleadoComponent } from './modal-add-empleado.component';

describe('ModalAddEmpleadoComponent', () => {
  let component: ModalAddEmpleadoComponent;
  let fixture: ComponentFixture<ModalAddEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddEmpleadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
