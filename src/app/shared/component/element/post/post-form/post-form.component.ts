import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PostDialogComponent} from "../post-dialog/post-dialog.component";
import {User} from "../../../../../core/model/basic/User";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Output() reRenderParent = new EventEmitter<any>();
  @Input() loginAvatar?: string;
  @Input() userName?: string;
  public user?: User;


  constructor(public dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostDialogComponent);
    dialogRef.componentInstance.reRenderParent.subscribe(data => {
      this.reRenderParent.emit(data);
    })
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }
}
