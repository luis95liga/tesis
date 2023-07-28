import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { UserResponse } from '@shared/models/user.interface';
import { take, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckUserGuard implements CanActivate {
  constructor(
    private authSvc: AuthService,
    private router: Router
    ) {}
  canActivate(): Observable<boolean>{
    return this.authSvc.user$.pipe(
      map((user: UserResponse)=>{
        if(!user){
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }

}
