import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRcptComponent } from './modal-rcpt.component';

describe('ModalRcptComponent', () => {
  let component: ModalRcptComponent;
  let fixture: ComponentFixture<ModalRcptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRcptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRcptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
