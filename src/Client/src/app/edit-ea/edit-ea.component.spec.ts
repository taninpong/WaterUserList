import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEaComponent } from './edit-ea.component';

describe('EditEaComponent', () => {
  let component: EditEaComponent;
  let fixture: ComponentFixture<EditEaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
