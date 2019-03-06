import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTabletComponent } from './upload-tablet.component';

describe('UploadTabletComponent', () => {
  let component: UploadTabletComponent;
  let fixture: ComponentFixture<UploadTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
