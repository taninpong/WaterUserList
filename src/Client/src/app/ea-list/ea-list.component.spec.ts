import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EaListComponent } from './ea-list.component';

describe('EaListComponent', () => {
  let component: EaListComponent;
  let fixture: ComponentFixture<EaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
