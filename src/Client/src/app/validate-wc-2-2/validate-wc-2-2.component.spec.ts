import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateWc22Component } from './validate-wc-2-2.component';

describe('ValidateWc22Component', () => {
  let component: ValidateWc22Component;
  let fixture: ComponentFixture<ValidateWc22Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateWc22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateWc22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
