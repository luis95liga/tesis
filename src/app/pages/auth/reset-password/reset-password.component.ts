import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  hide = true;
  hide1 = true;
  encoded_pk: string ='';
  token: string ='';
  passwordform: any;
  invalid = false;

  constructor(
    private active: ActivatedRoute,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this. PasswordForm();
    this.active.params.subscribe(params => {
      this.encoded_pk = params['encoded_pk'];
      this.token = params['token'];
    });
  }

  PasswordForm(): void {
    this.passwordform = this.fb.group({
      password: [null,[
        Validators.required,
        Validators.minLength(8),
        Validators.compose([
          uppercaseValidator(/\d/,{ hasNumber: true }),
          uppercaseValidator(/[A-Z]/,{ hasCapitalCase: true }),
          uppercaseValidator(/[a-z]/,{ hasSmallCase: true })
        ])
      ]],
      password2: [null,[
        Validators.required,
        Validators.minLength(8),
        Validators.compose([
          uppercaseValidator(/\d/,{ hasNumber: true }),
          uppercaseValidator(/[A-Z]/,{ hasCapitalCase: true }),
          uppercaseValidator(/[a-z]/,{ hasSmallCase: true })
        ])
      ]]
    }, {
      validators: this.passwordValidators
    });
  }

  passwordValidators(form: FormGroup){
    const password = form.get('password')?.value;
    const password2 = form.get('password2')?.value;
    if(password != password2){
      form.get('password2')?.setErrors({ mismatch: true });
    }else{
      return;
    }
  }

  save(): void {
    this.authSvc.ResetPassword(this.passwordform.value,this.encoded_pk, this.token).subscribe(
      (res)=>{
        console.log(res);
        this.toastr.success('Contraseña Actulizada','Contraseña',{
          timeOut: 5000,
        });
        this.invalid = false;
        this.passwordform.reset();
        this.router.navigate(['/login']);
      },
      (err)=>{
        this.toastr.error(err.non_field_errors[0],'Error Al actulizar la Contrseña',{
          timeOut: 5000,
        });
        this.invalid = true;
      }
    );
  }

  isvalid(field: string): boolean {
    const form = this.passwordform.get(field);
    return (form?.invalid && (form.dirty || form.touched)) || false;
  }

  errorMessage(field: string): string {
    const  errors: any  = this.passwordform.get(field)?.errors;
    if (errors) {
      const minlength = errors?.minlength?.requiredLength;
      const messages:any = {
        required: '* Ser Requerido',
        minlength: `* Mínimo ${minlength} Caracteres`,
        mismatch: '* Coincidir'
      };
      const errorKey = Object.keys(errors).find(Boolean);
      return messages[ errorKey || '' ];
    }
    return '';
  }
}

function uppercaseValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !regex.test(value)) {
      return error
    }
    return null;
  };
}
