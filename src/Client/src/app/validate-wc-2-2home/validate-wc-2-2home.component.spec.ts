import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateWc22homeComponent } from './validate-wc-2-2home.component';

describe('ValidateWc22homeComponent', () => {
  let component: ValidateWc22homeComponent;
  let fixture: ComponentFixture<ValidateWc22homeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateWc22homeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateWc22homeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
