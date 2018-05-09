import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasscodeSentComponent } from './passcode-sent.component';

describe('PasscodeSentComponent', () => {
  let component: PasscodeSentComponent;
  let fixture: ComponentFixture<PasscodeSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasscodeSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasscodeSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
