import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser && (currentUser === 'admin' || currentUser === 'user')) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
