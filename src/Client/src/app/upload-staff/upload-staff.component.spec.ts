import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStaffComponent } from './upload-staff.component';

describe('UploadStaffComponent', () => {
  let component: UploadStaffComponent;
  let fixture: ComponentFixture<UploadStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
