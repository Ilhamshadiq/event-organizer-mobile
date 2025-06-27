import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
  standalone: false,
})
export class UserDetailPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
