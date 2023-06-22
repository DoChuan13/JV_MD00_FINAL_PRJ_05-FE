import {Component, OnInit} from '@angular/core';
import {mainJs} from "../../../../assets/js/Javascrip";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    mainJs();
  }

}
