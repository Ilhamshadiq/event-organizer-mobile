import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryEventPageRoutingModule } from './history-event-routing.module';

import { HistoryEventPage } from './history-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryEventPageRoutingModule
  ],
  declarations: [HistoryEventPage]
})
export class HistoryEventPageModule {}
