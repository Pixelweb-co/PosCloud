import { ComponentFixture, TestBed } from '@angular/core/testing';
'./modal-add-Empleado.component'
import {ModalAddEmpleado} from './modal-add-empleado.component';

describe('ModalAddEmpleado', () => {
  let component: ModalAddEmpleado;
  let fixture: ComponentFixture<ModalAddEmpleado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddEmpleado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddEmpleado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
