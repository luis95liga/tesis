import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  private subscription: Subscription = new Subscription();
  loginform: any;
  private isValidEmail = /\S+@\S+\.\S+/;
  constructor(
    private authSvc: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private setTitle: Title,
    private tooastr: ToastrService
  ) {
    this.setTitle.setTitle('TRANSPORTROUTE - Login');
  }

  LoginForm(): void{
    this.loginform = this.fb.group({
      username: ['',[Validators.required,Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.LoginForm();
  }
  onLogin(): void{
    if(this.loginform.invalid){
      return;
    }

    const formvalue = this.loginform.value;
    this.subscription.add(
      this.authSvc.login(formvalue).subscribe(res=>{
        if(res){
          this.router.navigate(['/displaypanel']);
        }
      },(err)=>{
        this.tooastr.error(err.error,'Error',{
          timeOut: 3000,
        });
      }
      )
    );
  }

  isValidField(field: string): boolean {
    return (this.loginform.get(field).invalid && (this.loginform.get(field).dirty || this.loginform.get(field).touched));
  }

  errorMessage(field: string): string {
    const { errors } = this.loginform.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages:any = {
        required: 'Valor Requerido',
        minlength: `el dato introducido es menor a ${minlenght} caracteres`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      return messages[errorKey || ''];
    }
    return '';
  }
}
