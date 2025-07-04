import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddEventPageRoutingModule } from './add-event-routing.module';
import { AddEventPage } from './add-event.page';

@NgModule({
  declarations: [AddEventPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddEventPageRoutingModule
  ]
})
export class AddEventPageModule {}
