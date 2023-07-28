import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { UserResponse } from '@shared/models/user.interface';
import { take, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean>{
    return this.authSvc.user$.pipe(
      map((user: UserResponse)=>{
        if(!user.user.is_superuser){
          this.router.navigate(['/displaypanel']);
          return false;
        }
        return true;
      })
    );
  }
}
