import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddCategoriaComponent } from './modal-add-categoria.component';

describe('ModalAddCategoriaComponent', () => {
  let component: ModalAddCategoriaComponent;
  let fixture: ComponentFixture<ModalAddCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAddCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
