import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryEventPage } from './history-event.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryEventPageRoutingModule {}
