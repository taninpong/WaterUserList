import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEaComponent } from './upload-ea.component';

describe('UploadEaComponent', () => {
  let component: UploadEaComponent;
  let fixture: ComponentFixture<UploadEaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadEaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
