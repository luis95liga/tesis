"use strict";(self.webpackChunkapptrasrouter=self.webpackChunkapptrasrouter||[]).push([[171],{4171:(T,p,o)=>{o.r(p),o.d(p,{LoginModule:()=>l});var m=o(6895),v=o(4738),d=o(9299),i=o(4006),y=o(727),e=o(4650),x=o(9829),C=o(1481),b=o(7185),L=o(3683),F=o(4859),S=o(7392),f=o(3546),E=o(5829);function M(r,n){if(1&r&&(e.\u0275\u0275elementStart(0,"small",21),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&r){const t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",t.errorMessage("username")," ")}}function k(r,n){if(1&r&&(e.\u0275\u0275elementStart(0,"small",21),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&r){const t=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",t.errorMessage("password")," ")}}const h=function(){return["/"]},I=function(r,n){return{"fa-eye":r,"fa-eye-slash":n}},O=function(){return["/reset-password"]};class s{constructor(n,t,c,u,g){this.authSvc=n,this.router=t,this.fb=c,this.setTitle=u,this.tooastr=g,this.hide=!0,this.subscription=new y.w0,this.isValidEmail=/\S+@\S+\.\S+/,this.setTitle.setTitle("TRANSPORTROUTE - Login")}LoginForm(){this.loginform=this.fb.group({username:["",[i.kI.required,i.kI.minLength(8)]],password:["",[i.kI.required,i.kI.minLength(8)]]})}ngOnDestroy(){this.subscription.unsubscribe()}ngOnInit(){this.LoginForm()}onLogin(){this.loginform.invalid||this.subscription.add(this.authSvc.login(this.loginform.value).subscribe(t=>{t&&this.router.navigate(["/displaypanel"])},t=>{this.tooastr.error(t.error,"Error",{timeOut:3e3})}))}isValidField(n){return this.loginform.get(n).invalid&&(this.loginform.get(n).dirty||this.loginform.get(n).touched)}errorMessage(n){const{errors:t}=this.loginform.get(n);return t?{required:"Valor Requerido",minlength:`el dato introducido es menor a ${t?.minlength?.requiredLength} caracteres`}[Object.keys(t).find(Boolean)||""]:""}}s.\u0275fac=function(n){return new(n||s)(e.\u0275\u0275directiveInject(x.e),e.\u0275\u0275directiveInject(d.F0),e.\u0275\u0275directiveInject(i.qu),e.\u0275\u0275directiveInject(C.Dx),e.\u0275\u0275directiveInject(b._W))},s.\u0275cmp=e.\u0275\u0275defineComponent({type:s,selectors:[["app-login"]],decls:40,vars:15,consts:[[1,"content"],[1,"login"],[1,"text-white","card-body"],["mat-icon-button","","aria-label","Regresar",3,"routerLink"],[2,"margin-right","20%"],[1,"text-center"],[1,"mt-4"],[1,"text-start",3,"formGroup"],[1,"form-group"],[1,"input-group","input-group-sm"],[1,"input-group-text","icos","text-white"],[1,"fa-solid","fa-user"],["type","text","formControlName","username","placeholder","Usuario","required","",1,"form-control"],["class","form-text text-danger",4,"ngIf"],[1,"fa-solid","fa-lock"],["formControlName","password","placeholder","Contrase\xf1a","required","",1,"form-control","btn1",3,"type"],["type","button",1,"input-group-text","bg-white",3,"click"],[1,"fa-solid",3,"ngClass"],[1,"link-primary","link-offset-2","link-underline-opacity-25","link-underline-opacity-100-hover",3,"routerLink"],[1,"d-grid","gap-2","mt-2"],["type","button",1,"btn","btn-lg","btn-primary","btn-sm",3,"disabled","click"],[1,"form-text","text-danger"]],template:function(n,t){1&n&&(e.\u0275\u0275elementStart(0,"div",0)(1,"div",1)(2,"mat-card")(3,"mat-toolbar",2)(4,"button",3)(5,"mat-icon"),e.\u0275\u0275text(6,"arrow_back"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(7,"span",4),e.\u0275\u0275elementStart(8,"span",5),e.\u0275\u0275text(9,"Iniciar Sesi\xf3n"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(10,"mat-card-content"),e.\u0275\u0275element(11,"h2",5)(12,"div",6),e.\u0275\u0275elementStart(13,"form",7)(14,"div",8)(15,"div",9)(16,"span",10),e.\u0275\u0275element(17,"i",11),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(18,"input",12),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(19,M,2,1,"small",13),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(20,"div",6),e.\u0275\u0275elementStart(21,"div",8)(22,"div",9)(23,"span",10),e.\u0275\u0275element(24,"i",14),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(25,"input",15),e.\u0275\u0275elementStart(26,"span",16),e.\u0275\u0275listener("click",function(){return t.hide=!t.hide}),e.\u0275\u0275element(27,"i",17),e.\u0275\u0275elementEnd()(),e.\u0275\u0275template(28,k,2,1,"small",13),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(29,"a",18),e.\u0275\u0275text(30,"\xbfOlvide mi Contrase\xf1a?"),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(31,"div",6),e.\u0275\u0275elementStart(32,"div",19)(33,"button",20),e.\u0275\u0275listener("click",function(){return t.onLogin()}),e.\u0275\u0275text(34,"Acceder"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(35,"span",5),e.\u0275\u0275text(36,"No Tienes Cuenta: "),e.\u0275\u0275elementStart(37,"a",18),e.\u0275\u0275text(38,"Solicitala Ahora"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275element(39,"div",6),e.\u0275\u0275elementEnd()()()()()),2&n&&(e.\u0275\u0275advance(4),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(9,h)),e.\u0275\u0275advance(9),e.\u0275\u0275property("formGroup",t.loginform),e.\u0275\u0275advance(6),e.\u0275\u0275property("ngIf",t.isValidField("username")||!1),e.\u0275\u0275advance(6),e.\u0275\u0275property("type",t.hide?"password":"text"),e.\u0275\u0275advance(2),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(10,I,t.hide,!t.hide)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",t.isValidField("password")||!1),e.\u0275\u0275advance(1),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(13,O)),e.\u0275\u0275advance(4),e.\u0275\u0275property("disabled",!t.loginform.valid),e.\u0275\u0275advance(4),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(14,h)))},dependencies:[m.mk,m.O5,d.rH,i._Y,i.Fj,i.JJ,i.JL,i.Q7,i.sg,i.u,L.Ye,F.RK,S.Hw,f.a8,f.dn,E.oO],styles:[".content[_ngcontent-%COMP%]{background:#FDFEFE;height:89.5%;display:flex;justify-content:center;align-items:center}.login[_ngcontent-%COMP%]{justify-content:center;background-color:#fbfcfc;align-items:center;width:400px;display:block}.img1[_ngcontent-%COMP%]{text-align:center}.link[_ngcontent-%COMP%]{margin-left:15px}.return[_ngcontent-%COMP%]{margin-left:5px}.full-width-input[_ngcontent-%COMP%]{width:100%}.card-body[_ngcontent-%COMP%]{background:#16a085}.icos[_ngcontent-%COMP%]{background:#16a085;position:relative}.btn1[_ngcontent-%COMP%]{border-right:none}"]});const j=[{path:"",component:s}];class a{}a.\u0275fac=function(n){return new(n||a)},a.\u0275mod=e.\u0275\u0275defineNgModule({type:a}),a.\u0275inj=e.\u0275\u0275defineInjector({imports:[d.Bz.forChild(j),d.Bz]});class l{}l.\u0275fac=function(n){return new(n||l)},l.\u0275mod=e.\u0275\u0275defineNgModule({type:l}),l.\u0275inj=e.\u0275\u0275defineInjector({imports:[m.ez,a,i.UX,v.q]})}}]);