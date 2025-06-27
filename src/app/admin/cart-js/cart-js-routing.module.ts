import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartJsPage } from './cart-js.page';

const routes: Routes = [
  {
    path: '',
    component: CartJsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartJsPageRoutingModule {}
