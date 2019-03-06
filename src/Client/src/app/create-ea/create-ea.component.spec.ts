import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEaComponent } from './create-ea.component';

describe('CreateEaComponent', () => {
  let component: CreateEaComponent;
  let fixture: ComponentFixture<CreateEaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
