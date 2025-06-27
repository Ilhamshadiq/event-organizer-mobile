import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FogotPasswordPageRoutingModule } from './fogot-password-routing.module';

import { FogotPasswordPage } from './fogot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FogotPasswordPageRoutingModule
  ],
  declarations: [FogotPasswordPage]
})
export class FogotPasswordPageModule {}
