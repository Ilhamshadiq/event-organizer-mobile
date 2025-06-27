import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserDetailPageRoutingModule } from './user-detail-routing.module';
import { RouterModule } from '@angular/router';

import { UserDetailPage } from './user-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserDetailPageRoutingModule,
    RouterModule
  ],
  declarations: [UserDetailPage]
})
export class UserDetailPageModule {}
