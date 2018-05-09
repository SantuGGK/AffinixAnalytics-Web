import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordInternalComponent } from './forgot-password-internal.component';

describe('ForgotPasswordInternalComponent', () => {
  let component: ForgotPasswordInternalComponent;
  let fixture: ComponentFixture<ForgotPasswordInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
