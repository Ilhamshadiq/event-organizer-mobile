import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { QRCodeComponent } from 'angularx-qrcode';

import { TicketPageRoutingModule } from './ticket-routing.module';

import { TicketPage } from './ticket.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketPageRoutingModule,
    QRCodeComponent,
  ],
  declarations: [TicketPage]
})
export class TicketPageModule {}
