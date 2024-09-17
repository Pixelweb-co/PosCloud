import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFtComponent } from './modal-ft.component';

describe('ModalFtComponent', () => {
  let component: ModalFtComponent;
  let fixture: ComponentFixture<ModalFtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
