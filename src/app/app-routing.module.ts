import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // ✅ Public Auth Pages
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'fogot-password',
    loadChildren: () => import('./auth/fogot-password/fogot-password.module').then(m => m.FogotPasswordPageModule)
  },

  // ✅ Public Event Detail (umum, tidak perlu login)
  {
    path: 'event-detail/:id',
    loadChildren: () => import('./event-detail/event-detail.module').then(m => m.EventDetailPageModule)
  },

  // ✅ User Section (hanya bisa diakses oleh user/peserta)
  {
    path: 'user',
    canActivate: [AuthGuard],
    data: { roles: ['user', 'peserta'] },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./user/home-user/home-user.module').then(m => m.HomeUserPageModule)
      },
      {
        path: 'ticket',
        loadChildren: () => import('./user/ticket/ticket.module').then(m => m.TicketPageModule)
      },
      {
        path: 'history-event',
        loadChildren: () => import('./user/history-event/history-event.module').then(m => m.HistoryEventPageModule)
      }
    ]
  },

  // ✅ Admin Section (hanya bisa diakses oleh admin)
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
        {
    path: 'edit-event/:id',
    loadChildren: () => import('./admin/edit-event/edit-event.module').then( m => m.EditEventPageModule)
       },
      {
        path: 'home',
        loadChildren: () => import('./admin/home-admin/home-admin.module').then(m => m.HomeAdminPageModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('./admin/user-management/user-management.module').then(m => m.UserManagementPageModule)
      },
      {
        path: 'stats-event',
        loadChildren: () => import('./admin/stats-event/stats-event.module').then(m => m.StatsEventPageModule)
      },
      {
        path: 'scan',
        loadChildren: () => import('./admin/scan/scan.module').then(m => m.ScanPageModule)
      },
      {
        path: 'cart-js/:id',
        loadChildren: () => import('./admin/cart-js/cart-js.module').then(m => m.CartJsPageModule)
      },
      {
        path: 'user-detail',
        loadChildren: () => import('./admin/user-detail/user-detail.module').then(m => m.UserDetailPageModule)
      },
      {
        path: 'add-event',
        loadChildren: () => import('./admin/add-event/add-event.module').then(m => m.AddEventPageModule)
      }
    ]
  },

  // ✅ Default route
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // ✅ Fallback route
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
