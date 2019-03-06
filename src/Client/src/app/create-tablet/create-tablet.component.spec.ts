import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTabletComponent } from './create-tablet.component';

describe('CreateTabletComponent', () => {
  let component: CreateTabletComponent;
  let fixture: ComponentFixture<CreateTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
