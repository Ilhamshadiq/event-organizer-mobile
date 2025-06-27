import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatsEventPageRoutingModule } from './stats-event-routing.module';
import { FooterNavbarComponent } from 'src/app/components/footer-navbar/footer-navbar.component';

import { StatsEventPage } from './stats-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatsEventPageRoutingModule,
    FooterNavbarComponent
  ],
  declarations: [StatsEventPage]
})
export class StatsEventPageModule {}
