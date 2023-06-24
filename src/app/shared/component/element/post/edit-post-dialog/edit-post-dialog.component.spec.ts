import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostDialogComponent } from './edit-post-dialog.component';

describe('PostDialogComponent', () => {
  let component: EditPostDialogComponent;
  let fixture: ComponentFixture<EditPostDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPostDialogComponent]
    });
    fixture = TestBed.createComponent(EditPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
