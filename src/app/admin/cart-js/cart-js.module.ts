import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartJsPageRoutingModule } from './cart-js-routing.module';
import { FooterNavbarComponent } from 'src/app/components/footer-navbar/footer-navbar.component';

import { CartJsPage } from './cart-js.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartJsPageRoutingModule,
    FooterNavbarComponent
  ],
  declarations: [CartJsPage]
})
export class CartJsPageModule {}
