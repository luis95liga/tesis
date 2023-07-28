import { AuthService } from '@auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  emailform: any;
  erroremail = false;
  private isValidEmail = /\S+@\S+\.\S+/;

  constructor(
    private fb: FormBuilder,
    private AuthSvc: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.EmailForm();
  }

  EmailForm(){
    this.emailform = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]]
    });
  }

  send(): void {
    this.AuthSvc.SendEmail(this.emailform.value).subscribe(
      (res)=>{
        this.erroremail = false;
        this.toastr.success('Correo Electronico Enviado Corectamente','Correo Electronico Enviado',{
          timeOut: 3000,
        });
        this.emailform.reset();
        this.router.navigate(['/']);
      },
      (err)=>{
        console.log(err);
        this.erroremail = true;
        this.emailform.reset();
      }
    );
  }

  isValidField(field: string): boolean {
    return (this.emailform.get(field).invalid && (this.emailform.get(field).dirty || this.emailform.get(field).touched));
  }

  errorMessage(field: string): string {
    const { errors } = this.emailform.get(field);
    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;

      const messages:any = {
        required: 'Valor Requerido',
        pattern: 'no es un Correo Electronico Valido',
        minlength: `el dato introducido es menor a ${minlenght} caracteres`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      return messages[errorKey || ''];
    }
    return '';
  }
}
