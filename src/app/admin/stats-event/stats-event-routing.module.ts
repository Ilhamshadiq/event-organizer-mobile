import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsEventPage } from './stats-event.page';

const routes: Routes = [
  {
    path: '',
    component: StatsEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsEventPageRoutingModule {}
