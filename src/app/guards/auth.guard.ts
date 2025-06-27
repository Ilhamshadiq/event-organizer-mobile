import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const expectedRoles: string[] = route.data['roles'];
    const userRole = this.authService.getRole();

    console.log('🔒 AuthGuard check');
    console.log('✅ isLoggedIn:', isLoggedIn);
    console.log('🔑 userRole:', userRole);
    console.log('🎯 expectedRoles:', expectedRoles);
    console.log('🌐 current route:', state.url);

    if (!isLoggedIn) {
      console.warn('❌ Belum login. Redirect ke login.');
      this.router.navigate(['/login']);
      return false;
    }

    if (expectedRoles?.length && !expectedRoles.some(role => role.toLowerCase() === userRole.toLowerCase())) {
      console.warn(`❌ Role "${userRole}" tidak diizinkan untuk akses ke ${state.url}`);
      this.router.navigate(['/login']);
      return false;
    }

    console.log('✅ Akses diizinkan');
    return true;
  }
}
