import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse, UserAccount, Lagout, UserView } from '@shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkToken();
   }
   get user$(): Observable<UserResponse>{
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }

  login(AuthDAta: UserAccount): Observable<UserResponse | void>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/login/`, AuthDAta)
    .pipe(
      map(
        (user: UserResponse) =>{
          console.log(user);
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  logout(): void{

    if(this.user.getValue()){
      const us = this.user.getValue();
      const u = {
        user: us.user.id
      };
      this.deleteSession(u).subscribe((res)=>{
        localStorage.removeItem('user');
        this.user.next(null);
        this.router.navigate(['/']);
      });
    }
  }

  UserView(pk: string | number): Observable<UserView>{
    return this.http.get<UserView>(`${environment.API_URL}/user/user/${pk}/`)
    .pipe(catchError(this.handlerError));
  }

  private deleteSession(dato: Lagout): Observable<Lagout>{
    return this.http.post<Lagout>(`${environment.API_URL}/logout/`,dato)
    .pipe(catchError(this.handlerError));
  }

  updatePassword(dato: any, pk: string | number): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/user/user/${pk}/set_password/`, dato)
    .pipe(catchError(this.handlerError));
  }

  updateUser(dato: any, pk: string | number): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/user/user/${pk}/`, dato)
    .pipe(catchError(this.handlerError));
  }

  SendEmail(dato: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/reset-password/`, dato)
    .pipe(catchError(this.handlerError));
  }

  ResetPassword(dato: any,encoded_pk: any, token: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/reset-password/${encoded_pk}/${token}/`, dato)
    .pipe(catchError(this.handlerError));
  }

  private checkToken(): void{
    const user = JSON.parse(localStorage.getItem('user')|| '{}');
    if(user){
      const isExpired = helper.isTokenExpired(user.token);
      if(!isExpired){
        this.user.next(user);
      }else{
        this.logout();
      }

    }
  }

  private saveLocalStorage(userResponse: UserResponse): void{
    const { message, ...rest } = userResponse;
    localStorage.setItem('user', JSON.stringify(rest));

  }

  private handlerError(err: any): Observable<never>{
    let errorMessage = '';
    console.log(err);
    if(err){
      errorMessage = err.error;
    }
    if(err.error.code=='token_not_valid'){
      window.location.reload()
    }
    return throwError(errorMessage);
   }
}
