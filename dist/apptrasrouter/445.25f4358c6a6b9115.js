"use strict";(self.webpackChunkapptrasrouter=self.webpackChunkapptrasrouter||[]).push([[445],{7965:(x,p,a)=>{a.r(p),a.d(p,{ForgotpasswordModule:()=>s});var m=a(6895),d=a(9299),o=a(4006),e=a(4650),f=a(9829),g=a(7185);function h(r,t){if(1&r&&(e.\u0275\u0275elementStart(0,"small",17),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&r){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("email")," ")}}function v(r,t){1&r&&(e.\u0275\u0275elementStart(0,"div",18)(1,"h4",19),e.\u0275\u0275text(2,"Email Incorrecto"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(3,"p",20),e.\u0275\u0275text(4,"En Correo Electr\xf3nico no est\xe1 anexado a Ninguna Cuenta Registrada, Por favo revisa y Vuelve a intentarlo "),e.\u0275\u0275elementStart(5,"a",21),e.\u0275\u0275text(6,"Si no recuerda su correo comun\xedquese con el administrador"),e.\u0275\u0275elementEnd(),e.\u0275\u0275text(7,". "),e.\u0275\u0275elementEnd()())}const F=function(r,t){return{"is-invalid":r,"is-valid":t}},E=function(){return["/login"]};class l{constructor(t,n,c,u){this.fb=t,this.AuthSvc=n,this.router=c,this.toastr=u,this.erroremail=!1,this.isValidEmail=/\S+@\S+\.\S+/}ngOnInit(){this.EmailForm()}EmailForm(){this.emailform=this.fb.group({email:["",[o.kI.required,o.kI.pattern(this.isValidEmail)]]})}send(){this.AuthSvc.SendEmail(this.emailform.value).subscribe(t=>{this.erroremail=!1,this.toastr.success("Correo Electronico Enviado Corectamente","Correo Electronico Enviado",{timeOut:3e3}),this.emailform.reset(),this.router.navigate(["/"])},t=>{console.log(t),this.erroremail=!0,this.emailform.reset()})}isValidField(t){return this.emailform.get(t).invalid&&(this.emailform.get(t).dirty||this.emailform.get(t).touched)}errorMessage(t){const{errors:n}=this.emailform.get(t);return n?{required:"Valor Requerido",pattern:"no es un Correo Electronico Valido",minlength:`el dato introducido es menor a ${n?.minlength?.requiredLength} caracteres`}[Object.keys(n).find(Boolean)||""]:""}}l.\u0275fac=function(t){return new(t||l)(e.\u0275\u0275directiveInject(o.qu),e.\u0275\u0275directiveInject(f.e),e.\u0275\u0275directiveInject(d.F0),e.\u0275\u0275directiveInject(g._W))},l.\u0275cmp=e.\u0275\u0275defineComponent({type:l,selectors:[["app-forgotpassword"]],decls:22,vars:10,consts:[[1,"content"],[1,"login"],[1,"text-center","fw-bolder"],[1,"card"],[1,"card-body"],[1,"card-title","text-center","fw-bolder"],[1,"text-center"],[3,"formGroup"],[1,"form-group"],["type","email","formControlName","email","aria-describedby","emailHelp","placeholder","example@example.com",1,"form-control",3,"ngClass"],["class","form-text text-danger",4,"ngIf"],[1,"mt-4"],["class","alert alert-dismissible alert-danger",4,"ngIf"],[1,"mt-1"],[1,"d-flex","justify-content-between"],["type","button",1,"btn","btn-danger",3,"routerLink"],["type","button",1,"btn","btn-success",3,"disabled","click"],[1,"form-text","text-danger"],[1,"alert","alert-dismissible","alert-danger"],[1,"alert-heading"],[1,"mb-0"],["href","mailto:loga95luis@gmail.com",1,"alert-link"]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"h3",2),e.\u0275\u0275text(3,"Restablecimiento de contrase\xf1a"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"div",3)(5,"div",4)(6,"h3",5),e.\u0275\u0275text(7,"Has olvidado tu contrase\xf1a"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(8,"h6",6),e.\u0275\u0275text(9,"Ingrese su correo electr\xf3nico con el que est\xe1 Registrado"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(10,"form",7)(11,"div",8),e.\u0275\u0275element(12,"input",9),e.\u0275\u0275template(13,h,2,1,"small",10),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(14,"div",11),e.\u0275\u0275template(15,v,8,0,"div",12),e.\u0275\u0275element(16,"div",13),e.\u0275\u0275elementStart(17,"div",14)(18,"button",15),e.\u0275\u0275text(19,"Atras"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(20,"button",16),e.\u0275\u0275listener("click",function(){return n.send()}),e.\u0275\u0275text(21,"Enviar"),e.\u0275\u0275elementEnd()()()()()()()),2&t&&(e.\u0275\u0275advance(10),e.\u0275\u0275property("formGroup",n.emailform),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(6,F,n.isValidField("email"),n.emailform.get("email").valid)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isValidField("email")||!1),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngIf",n.erroremail||!1),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(9,E)),e.\u0275\u0275advance(2),e.\u0275\u0275property("disabled",!n.emailform.valid))},dependencies:[m.mk,m.O5,d.rH,o._Y,o.Fj,o.JJ,o.JL,o.sg,o.u],styles:[".content[_ngcontent-%COMP%]{background:#FDFEFE;height:89.5%;display:flex;justify-content:center;align-items:center}.login[_ngcontent-%COMP%]{justify-content:center;background-color:#fbfcfc;align-items:center;width:800px;display:block}"]});const y=[{path:"",component:l}];class i{}i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.\u0275\u0275defineNgModule({type:i}),i.\u0275inj=e.\u0275\u0275defineInjector({imports:[d.Bz.forChild(y),d.Bz]});class s{}s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.\u0275\u0275defineNgModule({type:s}),s.\u0275inj=e.\u0275\u0275defineInjector({imports:[m.ez,i,o.UX]})}}]);