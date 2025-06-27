import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAdminPageRoutingModule } from './home-admin-routing.module';
import { FooterNavbarComponent } from 'src/app/components/footer-navbar/footer-navbar.component';

import { HomeAdminPage } from './home-admin.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAdminPageRoutingModule,
    FooterNavbarComponent,
    RouterModule,
  ],
  declarations: [HomeAdminPage]
})
export class HomeAdminPageModule {}
