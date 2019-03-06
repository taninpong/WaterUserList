import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressApproveComponent } from './progress-approve.component';

describe('ProgressApproveComponent', () => {
  let component: ProgressApproveComponent;
  let fixture: ComponentFixture<ProgressApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
