import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommentDialogComponent } from './edit-comment-dialog.component';

describe('CommentDialogComponent', () => {
  let component: EditCommentDialogComponent;
  let fixture: ComponentFixture<EditCommentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCommentDialogComponent]
    });
    fixture = TestBed.createComponent(EditCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
