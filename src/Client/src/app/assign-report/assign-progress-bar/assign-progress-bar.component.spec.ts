import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProgressBarComponent } from './assign-progress-bar.component';

describe('AssignProgressBarComponent', () => {
  let component: AssignProgressBarComponent;
  let fixture: ComponentFixture<AssignProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
