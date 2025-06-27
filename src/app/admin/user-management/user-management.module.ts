import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserManagementPageRoutingModule } from './user-management-routing.module';
import { FooterNavbarComponent } from 'src/app/components/footer-navbar/footer-navbar.component';

import { UserManagementPage } from './user-management.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserManagementPageRoutingModule,
    FooterNavbarComponent,
    ReactiveFormsModule
  ],
  declarations: [UserManagementPage]
})
export class UserManagementPageModule {}
