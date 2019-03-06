import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTabletComponent } from './open-tablet.component';

describe('OpenTabletComponent', () => {
  let component: OpenTabletComponent;
  let fixture: ComponentFixture<OpenTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
