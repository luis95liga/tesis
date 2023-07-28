import { Component, OnInit,  Inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserView } from '@app/shared/models/user.interface';
import { AuthService } from '@auth/auth.service';
import { environment } from '@env/environment';
import { ToastrService } from 'ngx-toastr';


interface SetPassword{
  password:string;
  password2: string;
}

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
  hide = true;
  hide1 = true;
  img ='';
  sr!: UserView;
  id = 0;
  userform: any;
  passwordform: any;
  private isValidEmail = /\S+@\S+\.\S+/;
  message ='';
  message1 ='';
  m:any = [];
  form: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cd:ChangeDetectorRef,
    private authSvc: AuthService,
    private toastr: ToastrService,
    public dialogo: MatDialogRef<UserprofileComponent>,
  ) { }

  ngOnInit(): void {
    this.UserForm();
    const id = this.data.Usuario.id;
    this.id = id;
    if(this.data.Usuario.id){
      this.authSvc.UserView(id).subscribe((user: UserView)=>{
        if(user){
          this.sr = user;
          if(user.image){
            this.img = environment.API_URL+user.image;
          }
          else{
            this.img='./../../../../assets/noimage.png';
          }
          this.userform.patchValue({
            is_active: user.is_active,
            is_staff: user.is_staff,
            is_superuser: user.is_superuser,
            //password: user.password,
            username: user.username,
            email: user.email,
            name: user.name,
            last_name: user.last_name
          });
          this.userform.updateValueAndValidity();
        }
      });
    }
  }

  UserForm(): void {
    this.userform = this.fb.group({
      username: [{ value: '', disabled: true },[Validators.required, Validators.minLength(4)]],
      email: [{ value: '', disabled: true },[Validators.required, Validators.minLength(4), Validators.pattern(this.isValidEmail),Validators.email]],
      name: [{ value: '', disabled: true },[Validators.required, Validators.minLength(4)]],
      last_name: [{ value: '', disabled: true },[Validators.required, Validators.minLength(4)]],
      password: [{ value: '', disabled: true },[]],
      image: [{ value: '', disabled: true },[]],
      is_active: [{ value: '', disabled: true },[]],
      is_staff: [{ value: '', disabled: true },[]],
      is_superuser: [{ value: '', disabled: true },[]]
    });
    this.passwordform = this.fb.group({
      password: ['',[Validators.required, Validators.minLength(4)]],
      password2: ['',[Validators.required, Validators.minLength(4)]]
    });

    this.form = this.fb.group({
      profile: ['']
    });
  }

  onChange(event:any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  updatePassword(): void{
    const data = this.passwordform.value;
    if(this.passwordform.value){
      this.authSvc.updatePassword(data, this.id).subscribe(res=>{
        this.m = res;
        this.toastr.success(this.m.message, 'Creado',{
          timeOut: 3000,
        });
      });
    }
  }

  update(): void{
    if(this.form.get('profile').value){
      const formData = new FormData();
      formData.append('username', this.userform.value.username);
      formData.append('email', this.userform.value.email);
      formData.append('name', this.userform.value.name);
      formData.append('last_name', this.userform.value.last_name);
      //formData.append('password', this.userform.value.password);
      formData.append('image', this.form.get('profile').value);
      formData.append('is_active', this.userform.value.is_active);
      formData.append('is_staff', this.userform.value.is_staff);
      formData.append('is_superuser', this.userform.value.is_superuser);
      this.authSvc.updateUser(formData, this.id).subscribe(res=>{
        this.m = res;
        this.toastr.warning(this.m.message, 'Actulizado',{
          timeOut: 3000,
        });
        this.dialogo.close(true);
      });
    }else{
      const data = this.userform.value;
      this.authSvc.updateUser(data, this.id).subscribe(res=>{
        this.m = res;
        this.toastr.warning(this.m.message, 'Actulizado',{
          timeOut: 3000,
        });
        this.dialogo.close(true);
      });
    }
  }

  isvalid(field: string): boolean {
    return (this.userform.get(field).invalid && (this.userform.get(field).dirty || this.userform.get(field).touched));
  }

  errorMessage(field: string): string {
    const { errors } = this.userform.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages:any = {
        required: 'Valor Requerido',
        pattern: 'No es un email valido',
        minlength: `El dato intruducido es menor a ${minlenght} caracteres`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      return messages[errorKey || ''];
    }
    return '';
  }

  isvalid1(field: string): boolean {
    return (this.passwordform.get(field).invalid && (this.passwordform.get(field).dirty || this.passwordform.get(field).touched));
  }

  errorMessage1(field: string): string {
    const { errors } = this.passwordform.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages:any = {
        required: 'Valor Requerido',
        pattern: 'No es un email valido',
        minlength: `El dato intruducido es menor a ${minlenght} caracteres`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      return messages[errorKey || ''];
    }
    return '';
  }

}
