import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMultiComponent } from './upload-multi.component';

describe('UploadComponent', () => {
  let component: UploadMultiComponent;
  let fixture: ComponentFixture<UploadMultiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadMultiComponent]
    });
    fixture = TestBed.createComponent(UploadMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
