"use strict";(self.webpackChunkapptrasrouter=self.webpackChunkapptrasrouter||[]).push([[962],{3962:(se,x,o)=>{o.r(x),o.d(x,{TrailerModule:()=>u});var C=o(6895),b=o(9299),h=o(5938),l=o(4006),w=o(2340),e=o(4650),S=o(94),y=o(2965),T=o(7185),I=o(3683),O=o(4859),F=o(7392),M=o(5829);function k(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"option",48),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275property("value",n.idowner),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate2("",n.name," ( ",n.company," )")}}function D(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("idowner")," ")}}function V(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"option",48),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275property("value",n.idvehicle_model),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate2("",n.manufacturer," ( ",n.model," )")}}function P(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("idvehicle_model")," ")}}function N(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"option",48),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275property("value",n.idvehicle_use),e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.vehicle_use)}}function z(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("idvehicle_use")," ")}}function j(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("tuition")," ")}}function R(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("idadministrative_data")," ")}}function L(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("color")," ")}}function A(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("hours_use")," ")}}function G(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("load_capacity")," ")}}function $(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",23),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("observation")," ")}}const d=function(i,t){return{"is-invalid":i,"is-valid":t}};var m=(()=>{return(i=m||(m={})).EDIT="edit",i.NEW="new",m;var i})();class f{constructor(t,n,r,a,s){this.data=t,this.vehicleSvc=n,this.catalogueSvc=r,this.toastr=a,this.fb=s,this.actionTODO=m.NEW,this.hide=!0,this.mensaje="",this.owners=[],this.vehiclemodels=[],this.vehicleuse=[],this.Idcompany=0,this.IdtechnicaldataTrailer=0,this.tuition=[],this.img="./../../../../../../assets/noimage.png"}ngOnInit(){this.list(),this.TrailerForm();const t=JSON.parse(localStorage.getItem("user")||"{}");this.Idcompany=t.Idcompany;const n=this.data.trailers;let r=[];for(const a in this.data.trailers)r.push(n[a].tuition);this.tuition=r,this.data.trailer.idtrailer?(this.idTrailer=this.data.trailer.idtrailer,this.IdtechnicaldataTrailer=this.data.trailer.idtechnical_datatrailer,this.actionTODO=m.EDIT,this.text="Editar",this.vehicleSvc.GetIdTrailer(this.idTrailer).subscribe(a=>{this.img=a.image?w.N.API_URL+a.image:"./../../../../../../assets/noimage.png",this.trailerform.patchValue({tuition:a.tuition,state:a.state,idowner:a.idowner,idvehicle_model:a.idvehicle_model,idvehicle_use:a.idvehicle_use}),this.trailerform.updateValueAndValidity(),this.catalogueSvc.GetIdTechnicalDataTrailer(this.IdtechnicaldataTrailer).subscribe(s=>{this.trailerform.patchValue({load_capacity:s.load_capacity,color:s.color,idadministrative_data:s.idadministrative_data,observation:s.observation,hours_use:s.hours_use}),this.trailerform.updateValueAndValidity()})})):(this.actionTODO=m.NEW,this.text="Nuevo")}onChange(t){if(t.target.files.length>0){const n=t.target.files[0];this.form.get("profile").setValue(n)}}list(){this.catalogueSvc.GetOwer().subscribe(t=>{this.owners=t},t=>console.error(t)),this.catalogueSvc.GetVehicleModel().subscribe(t=>{this.vehiclemodels=t.filter(n=>"TODOREMOLQUES"===n.model)},t=>console.error(t)),this.catalogueSvc.GetVehicleUse().subscribe(t=>{this.vehicleuse=t},t=>console.error(t))}TrailerForm(){this.trailerform=this.fb.group({image:[],tuition:["",[l.kI.required,l.kI.minLength(7)]],state:[!0],idowner:[,[l.kI.required]],idvehicle_model:[,[l.kI.required]],idvehicle_use:[,[l.kI.required]],load_capacity:[,[l.kI.required]],color:["",[l.kI.required,l.kI.minLength(4)]],idadministrative_data:[,[l.kI.required]],observation:["",[l.kI.required,l.kI.minLength(4)]],hours_use:["",[l.kI.required,l.kI.minLength(4)]]}),this.form=this.fb.group({profile:[""]})}isvalid(t){return this.trailerform.get(t).invalid&&(this.trailerform.get(t).dirty||this.trailerform.get(t).touched)}errorMessage(t){const{errors:n}=this.trailerform.get(t);let r=n?.minlength?.requiredLength;return n?{required:"el campo es requerido",minlength:`el valor ingresado es menor a ${r} carateres`}[Object.keys(n).find(Boolean)||""]:""}IsTuitionValidate(t){this.tuition.filter(r=>r.includes(t.target.value)).length&&(window.alert("Maticula ya Exixte"),this.trailerform.patchValue({tuition:""}),this.trailerform.updateValueAndValidity())}save(){if(this.form.get("profile").value){if(this.actionTODO===m.NEW){const t=new FormData;t.append("image",this.form.get("profile").value),t.append("tuition",this.trailerform.value.tuition),t.append("state",this.trailerform.value.state),t.append("idowner",this.trailerform.value.idowner),t.append("idvehicle_model",this.trailerform.value.idvehicle_model),t.append("idvehicle_use",this.trailerform.value.idvehicle_use),t.append("load_capacity",this.trailerform.value.load_capacity),t.append("color",this.trailerform.value.color),t.append("idadministrative_data",this.trailerform.value.idadministrative_data),t.append("observation",this.trailerform.value.observation),t.append("hours_use",this.trailerform.value.hours_use),this.vehicleSvc.PostCreateTrailer(t).subscribe(n=>{this.m=n,this.toastr.success(this.m.message,"Creado",{timeOut:3e3})})}if(this.actionTODO===m.EDIT){const t=new FormData;t.append("image",this.form.get("profile").value),t.append("tuition",this.trailerform.value.tuition),t.append("state",this.trailerform.value.state),t.append("idowner",this.trailerform.value.idowner),t.append("idvehicle_model",this.trailerform.value.idvehicle_model),t.append("idvehicle_use",this.trailerform.value.idvehicle_use),t.append("idtechnical_datatrailer",""+this.IdtechnicaldataTrailer);const n={load_capacity:this.trailerform.value.load_capacity,color:this.trailerform.value.color,idadministrative_data:this.trailerform.value.idadministrative_data,observation:this.trailerform.value.observation,hours_use:this.trailerform.value.hours_use};this.vehicleSvc.PutTrailer(t,this.idTrailer).subscribe(r=>{this.m=r,this.toastr.warning(this.m.message,"Actulizado",{timeOut:3e3})}),this.catalogueSvc.PutTechnicalDataTrailer(n,this.IdtechnicaldataTrailer).subscribe(r=>{this.m=r,this.toastr.warning(this.m.message,"Actulizado",{timeOut:3e3})})}}else if(this.actionTODO===m.NEW&&this.vehicleSvc.PostCreateTrailer(this.trailerform.value).subscribe(n=>{this.m=n,this.toastr.success(this.m.message,"Creado",{timeOut:3e3})}),this.actionTODO===m.EDIT){const n={load_capacity:this.trailerform.value.load_capacity,color:this.trailerform.value.color,idadministrative_data:this.trailerform.value.idadministrative_data,observation:this.trailerform.value.observation,hours_use:this.trailerform.value.hours_use};this.vehicleSvc.PutTrailer({image:null,tuition:this.trailerform.value.tuition,state:this.trailerform.value.state,idowner:this.trailerform.value.idowner,idvehicle_model:this.trailerform.value.idvehicle_model,idvehicle_use:this.trailerform.value.idvehicle_use,idtechnical_datatrailer:this.IdtechnicaldataTrailer},this.idTrailer).subscribe(r=>{this.m=r,this.toastr.warning(this.m.message,"Actulizado",{timeOut:3e3})}),this.catalogueSvc.PutTechnicalDataTrailer(n,this.IdtechnicaldataTrailer).subscribe(r=>{this.m=r,this.toastr.warning(this.m.message,"Actulizado",{timeOut:3e3})})}}}f.\u0275fac=function(t){return new(t||f)(e.\u0275\u0275directiveInject(h.WI),e.\u0275\u0275directiveInject(S.f),e.\u0275\u0275directiveInject(y.k),e.\u0275\u0275directiveInject(T._W),e.\u0275\u0275directiveInject(l.qu))},f.\u0275cmp=e.\u0275\u0275defineComponent({type:f,selectors:[["app-form"]],decls:113,vars:54,consts:[[1,"text-white","bg-primary"],[1,"fill-remaining-space"],["mat-icon-button","","aria-label","Example icon button with a vertical three dot icon",3,"mat-dialog-close"],[3,"formGroup"],[1,"col-sm-12"],[1,"form-group","row"],[1,"col-sm-2","col-form-label","fw-bold"],[1,"col-sm-10"],["formControlName","idowner",1,"form-select","form-select-sm",3,"ngClass"],["value",""],[3,"value",4,"ngFor","ngForOf"],["class","form-text text-danger",4,"ngIf"],[1,"row","align-items-center"],[1,"col-sm-1"],[1,"image","text-center",3,"src"],[1,"col-sm-11"],[1,"row"],[1,"col-sm-6"],[1,"col-sm-3","col-form-label","fw-bold"],[1,"col-sm-9"],["formControlName","idvehicle_model","required","",1,"form-select","form-select-sm",3,"ngClass"],["formControlName","idvehicle_use",1,"form-select","form-select-sm",3,"ngClass"],["type","file",1,"form-control","form-control-sm",3,"change"],[1,"form-text","text-danger"],[1,"col-sm-3"],[1,"col-sm-4","col-form-label","fw-bold"],[1,"col-sm-8"],[1,"form-check","mt-2"],["type","checkbox","checked","","formControlName","state",1,"form-check-input"],[1,"form-check-label"],[1,"col-sm-8","card","border-dark"],[1,"text"],[1,"card-body"],[1,"col-sm-7"],[1,"col-sm-5","col-form-label","fw-bold"],["type","text","formControlName","tuition",1,"form-control","form-control-sm",3,"ngClass","change"],["type","number","min","1","pattern","^[0-9]+","formControlName","idadministrative_data",1,"form-control","form-control-sm",3,"ngClass"],[1,"col-sm-5"],["type","text","formControlName","color",1,"form-control","form-control-sm",3,"ngClass"],[1,"col-sm-4"],["type","number","min","1","pattern","^[0-9]+","formControlName","hours_use",1,"form-control","form-control-sm",3,"ngClass"],[1,"input-group","input-group-sm"],["type","number","formControlName","load_capacity",1,"form-control",3,"ngClass"],[1,"input-group-text"],[1,"mt-2"],["type","text","rows","3","formControlName","observation",1,"form-control","form-control-sm",3,"ngClass"],["align","end"],["cdkFocusInitial","",1,"btn","btn-success",3,"disabled","mat-dialog-close","click"],[3,"value"]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"mat-toolbar",0)(1,"span"),e.\u0275\u0275text(2),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(3,"span",1),e.\u0275\u0275elementStart(4,"button",2)(5,"mat-icon"),e.\u0275\u0275text(6,"close"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(7,"mat-dialog-content")(8,"form",3)(9,"div",4)(10,"div",5)(11,"label",6),e.\u0275\u0275text(12,"Propietario:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(13,"div",7)(14,"select",8)(15,"option",9),e.\u0275\u0275text(16,"Seleccione"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(17,k,2,3,"option",10),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(18,D,2,1,"small",11),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(19,"div",12)(20,"div",13),e.\u0275\u0275element(21,"img",14),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(22,"div",15)(23,"div",16)(24,"div",17)(25,"div",5)(26,"label",18),e.\u0275\u0275text(27,"Modelo:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(28,"div",19)(29,"select",20)(30,"option",9),e.\u0275\u0275text(31,"seleccione uno"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(32,V,2,3,"option",10),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(33,P,2,1,"small",11),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(34,"div",17)(35,"div",5)(36,"label",6),e.\u0275\u0275text(37,"Uso:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(38,"div",7)(39,"select",21)(40,"option",9),e.\u0275\u0275text(41,"seleccione uno"),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(42,N,2,2,"option",10),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(43,z,2,1,"small",11),e.\u0275\u0275elementEnd()()()()()(),e.\u0275\u0275elementStart(44,"div",16)(45,"div",19)(46,"div",5)(47,"label",6),e.\u0275\u0275text(48,"Imagen:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(49,"div",7)(50,"input",22),e.\u0275\u0275listener("change",function(a){return n.onChange(a)}),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(51,"small",23),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(52,"div",24)(53,"div",5)(54,"label",25),e.\u0275\u0275text(55,"Estado:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(56,"div",26)(57,"div",27),e.\u0275\u0275element(58,"input",28),e.\u0275\u0275elementStart(59,"label",29),e.\u0275\u0275text(60,"Activo"),e.\u0275\u0275elementEnd()()()()()(),e.\u0275\u0275elementStart(61,"div",16)(62,"div",30)(63,"h6",31),e.\u0275\u0275text(64,"Datos de Identificaci\xf3n:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(65,"div",32)(66,"div",16)(67,"div",33)(68,"div",5)(69,"label",34),e.\u0275\u0275text(70,"Matricula(Placa):"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(71,"div",33)(72,"input",35),e.\u0275\u0275listener("change",function(a){return n.IsTuitionValidate(a)}),e.\u0275\u0275elementEnd(),e.\u0275\u0275template(73,j,2,1,"small",11),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(74,"div",5)(75,"label",6),e.\u0275\u0275text(76,"A.D:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(77,"div",7),e.\u0275\u0275element(78,"input",36),e.\u0275\u0275template(79,R,2,1,"small",11),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(80,"div",37)(81,"div",5)(82,"label",25),e.\u0275\u0275text(83,"Color:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(84,"div",26),e.\u0275\u0275element(85,"input",38),e.\u0275\u0275template(86,L,2,1,"small",11),e.\u0275\u0275elementEnd()()()()()(),e.\u0275\u0275elementStart(87,"div",39)(88,"div",5)(89,"label",34),e.\u0275\u0275text(90,"Horas de Uso:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(91,"div",33),e.\u0275\u0275element(92,"input",40),e.\u0275\u0275template(93,A,2,1,"small",11),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(94,"div",5)(95,"label",25),e.\u0275\u0275text(96,"Cap. Carga:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(97,"div",26)(98,"div",41),e.\u0275\u0275element(99,"input",42),e.\u0275\u0275elementStart(100,"span",43),e.\u0275\u0275text(101,"Kg"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275template(102,G,2,1,"small",11),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275element(103,"div",44),e.\u0275\u0275elementStart(104,"div",5)(105,"label",6),e.\u0275\u0275text(106,"Obserbaci\xf3n:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(107,"div",7),e.\u0275\u0275element(108,"textarea",45),e.\u0275\u0275template(109,$,2,1,"small",11),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(110,"mat-dialog-actions",46)(111,"button",47),e.\u0275\u0275listener("click",function(){return n.save()}),e.\u0275\u0275text(112,"Guardar"),e.\u0275\u0275elementEnd()()),2&t&&(e.\u0275\u0275advance(2),e.\u0275\u0275textInterpolate1("",n.text," Veh\xedculo"),e.\u0275\u0275advance(2),e.\u0275\u0275property("mat-dialog-close",!0),e.\u0275\u0275advance(4),e.\u0275\u0275property("formGroup",n.trailerform),e.\u0275\u0275advance(6),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(27,d,n.isvalid("idowner"),n.trailerform.get("idowner").valid)),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngForOf",n.owners),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("idowner")||!1),e.\u0275\u0275advance(3),e.\u0275\u0275property("src",n.img,e.\u0275\u0275sanitizeUrl),e.\u0275\u0275advance(8),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(30,d,n.isvalid("idvehicle_model"),n.trailerform.get("idvehicle_model").valid)),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngForOf",n.vehiclemodels),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("idvehicle_model")||!1),e.\u0275\u0275advance(6),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(33,d,n.isvalid("idvehicle_use"),n.trailerform.get("idvehicle_use").valid)),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngForOf",n.vehicleuse),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("idvehicle_use")||!1),e.\u0275\u0275advance(29),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(36,d,n.isvalid("tuition"),n.trailerform.get("tuition").valid)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("tuition")||!1),e.\u0275\u0275advance(5),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(39,d,n.isvalid("idadministrative_data"),n.trailerform.get("idadministrative_data").valid)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("idadministrative_data")||!1),e.\u0275\u0275advance(6),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(42,d,n.isvalid("color"),n.trailerform.get("color").valid)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("color")||!1),e.\u0275\u0275advance(6),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(45,d,n.isvalid("hours_use"),n.trailerform.get("hours_use").valid)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("hours_use")||!1),e.\u0275\u0275advance(6),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(48,d,n.isvalid("load_capacity"),n.trailerform.get("load_capacity").valid)),e.\u0275\u0275advance(3),e.\u0275\u0275property("ngIf",n.isvalid("load_capacity")||!1),e.\u0275\u0275advance(6),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(51,d,n.isvalid("observation"),n.trailerform.get("observation").valid)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("observation")||!1),e.\u0275\u0275advance(2),e.\u0275\u0275property("disabled",!n.trailerform.valid)("mat-dialog-close",!0))},dependencies:[C.mk,C.sg,C.O5,I.Ye,O.RK,F.Hw,h.ZT,h.xY,h.H8,M.oO,l._Y,l.YN,l.Kr,l.Fj,l.wV,l.Wl,l.EJ,l.JJ,l.JL,l.Q7,l.c5,l.qQ,l.sg,l.u],styles:[".image[_ngcontent-%COMP%]{width:100%;height:58%}.fill-remaining-space[_ngcontent-%COMP%]{flex:1 1 auto}.btn-dialog-close[_ngcontent-%COMP%]{width:45px;min-width:0px!important;height:40px;padding:0!important}label[_ngcontent-%COMP%]{color:#000}mat-toolbar[_ngcontent-%COMP%]{background-color:#f7f9f9;color:#1c2833;font-size:1em}.header[_ngcontent-%COMP%]{font-family:Franklin Gothic Medium,Arial Narrow,Arial,sans-serif;font-size:xx-large;font-weight:700}.spacer[_ngcontent-%COMP%]{border:none}button[_ngcontent-%COMP%]{margin-right:8px}.text[_ngcontent-%COMP%]{width:120px;font-size:xx-small;font-style:oblique;font-weight:700;margin-top:-5px;margin-left:5px;background:white;display:block}"]});class v{}v.\u0275fac=function(t){return new(t||v)},v.\u0275cmp=e.\u0275\u0275defineComponent({type:v,selectors:[["app-view"]],decls:2,vars:0,template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"p"),e.\u0275\u0275text(1,"view works!"),e.\u0275\u0275elementEnd())},styles:[".text[_ngcontent-%COMP%]{color:#000;text-align:left;font-weight:700;margin:10px}.alg[_ngcontent-%COMP%]{text-align:right;align-items:flex-end}.spacer[_ngcontent-%COMP%]{border:none}.spacer2[_ngcontent-%COMP%]{margin:10px}.spacer1[_ngcontent-%COMP%]{flex:1 1 auto;margin-left:40%}table[_ngcontent-%COMP%]{width:100%}"]});var c=o(671),E=o(7974);const W=["scheduledOrdersPaginator"];function U(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",36),e.\u0275\u0275text(1,"Id"),e.\u0275\u0275elementEnd())}function B(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"td",37),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.idtrailer)}}function Q(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",36),e.\u0275\u0275text(1,"Matricula(Placa)"),e.\u0275\u0275elementEnd())}function H(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"td",37),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.tuition)}}function J(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",36),e.\u0275\u0275text(1,"Modelos de Vehiculo"),e.\u0275\u0275elementEnd())}function Y(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"td",37),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.vehicle_model)}}function q(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",36),e.\u0275\u0275text(1,"Propietario"),e.\u0275\u0275elementEnd())}function K(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"td",37),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.owner)}}function X(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",36),e.\u0275\u0275text(1,"Uso de Vehiculo"),e.\u0275\u0275elementEnd())}function Z(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"td",37),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.vehicle_use)}}function ee(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",36),e.\u0275\u0275text(1,"Aciones"),e.\u0275\u0275elementEnd())}function te(i,t){if(1&i){const n=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"td",37)(1,"div",38)(2,"button",39),e.\u0275\u0275listener("click",function(){const s=e.\u0275\u0275restoreView(n).$implicit,_=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(_.onOpenModalView(s))}),e.\u0275\u0275element(3,"i",40),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"button",41),e.\u0275\u0275listener("click",function(){const s=e.\u0275\u0275restoreView(n).$implicit,_=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(_.onOpenModalForm(s))}),e.\u0275\u0275element(5,"i",42),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(6,"button",43),e.\u0275\u0275listener("click",function(){const s=e.\u0275\u0275restoreView(n).$implicit,_=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(_.delete(s))}),e.\u0275\u0275element(7,"i",44),e.\u0275\u0275elementEnd()()()}}function ne(i,t){1&i&&e.\u0275\u0275element(0,"tr",45)}function ie(i,t){1&i&&e.\u0275\u0275element(0,"tr",46)}const ae=function(){return["/displaypanel"]},re=function(){return["/displaypanel/vehicle"]};class g{set paginator(t){t&&(this.dataSource.paginator=t)}constructor(t,n,r,a){this.dialog=t,this.catalogueSvc=n,this.vehicleSvc=r,this.toastr=a,this.displayedColumns=["idtrailer","tuition","owner","vehicle_model","vehicle_use","actions"],this.dataSource=new c.by,this.length=0,this.pageSize=10,this.pageSizeOptions=[]}ngOnInit(){this.list()}list(){this.vehicleSvc.GetTrailer().subscribe(t=>{this.dataSource.data=t,console.log(this.dataSource.data),this.length=t.length,this.pageSizeOptions=[5,10,20,t.length]})}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase()}onOpenModalForm(t={}){this.dialog.open(f,{height:"520px",width:"2500px",hasBackdrop:!0,disableClose:!0,data:{title:"Nuevo Trailer",trailers:this.dataSource.data,trailer:t}}).afterClosed().subscribe(r=>{this.vehicleSvc.GetTrailer().subscribe(a=>{this.dataSource.data=a},a=>console.error(a)),this.list()})}onOpenModalView(t={}){this.dialog.open(v,{height:"500px",width:"2500px",hasBackdrop:!0,disableClose:!0,data:{title:"View Vehiculo",trailer:t}}).afterClosed().subscribe(r=>{this.vehicleSvc.GetTrailer().subscribe(a=>{this.dataSource.data=a},a=>console.error(a))})}delete(t){window.confirm("Desea eliminar este Registro")&&(this.vehicleSvc.DeleteVehicle(t.idtrailer).subscribe(n=>{}),this.catalogueSvc.DeleteTechnicalData(t.idtechnical_datatrailer).subscribe(n=>{console.log(t.idtechnical_data),this.toastr.error("Registro Eliminado","Eliminado",{timeOut:3e3}),this.list()}))}}g.\u0275fac=function(t){return new(t||g)(e.\u0275\u0275directiveInject(h.uw),e.\u0275\u0275directiveInject(y.k),e.\u0275\u0275directiveInject(S.f),e.\u0275\u0275directiveInject(T._W))},g.\u0275cmp=e.\u0275\u0275defineComponent({type:g,selectors:[["app-trailer"]],viewQuery:function(t,n){if(1&t&&e.\u0275\u0275viewQuery(W,5),2&t){let r;e.\u0275\u0275queryRefresh(r=e.\u0275\u0275loadQuery())&&(n.paginator=r.first)}},decls:56,vars:10,consts:[[1,"container-fluid"],[1,"mt-4"],["aria-label","breadcrume"],["aria-label","breadcrumb",1,"breadcrumb","bre",2,"--bs-breadcrumb-divider","url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")"],[1,"breadcrumb-item"],[1,"text-info-emphasis",3,"routerLink"],[1,"fa-solid","fa-house"],[3,"routerLink"],["aria-current","page",1,"breadcrumb-item","active"],[1,"form-group","d-flex","justify-content-between"],[1,"fw-bold"],["type","button",1,"btn","btn-lg","btn-success","btn-sm",3,"click"],[1,"fa-solid","fa-plus"],[1,"mt-1"],[1,"card"],[1,"card-body"],[1,"d-flex","justify-content-between"],[1,"mb-1","row","text-black"],[1,"spacer1"],[1,"form-group","row"],[1,"col-sm-4","col-form-label","fw-bold"],[1,"col-sm-8"],["type","text","placeholder","Buscar",1,"form-control","form-control-sm",3,"keyup"],["mat-table","",1,"table","table-sm","table-striped","table-hover",3,"dataSource"],["matColumnDef","idtrailer"],["scope","col",4,"matHeaderCellDef"],["scope","row",4,"matCellDef"],["matColumnDef","tuition"],["matColumnDef","vehicle_model"],["matColumnDef","owner"],["matColumnDef","vehicle_use"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",1,"pagination-sm",3,"length","pageSize","pageSizeOptions"],["scheduledOrdersPaginator",""],["scope","col"],["scope","row"],[1,""],[1,"spacer","btn","btn-outline-primary","btn-sm",3,"click"],[1,"fa-solid","fa-eye"],[1,"spacer","btn","btn-outline-warning","btn-sm",3,"click"],[1,"fa-solid","fa-file-pen"],[1,"spacer","btn","btn-outline-danger","btn-sm",3,"click"],[1,"fa-solid","fa-trash-can"],["mat-header-row",""],["mat-row",""]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"div",0),e.\u0275\u0275element(1,"div",1),e.\u0275\u0275elementStart(2,"nav",2)(3,"ol",3)(4,"li",4)(5,"a",5),e.\u0275\u0275element(6,"i",6),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(7,"li",4)(8,"a",7),e.\u0275\u0275text(9,"Veh\xedculos"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(10,"li",8),e.\u0275\u0275text(11,"Remolque"),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(12,"div",9)(13,"h4",10),e.\u0275\u0275text(14,"Remolque"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(15,"button",11),e.\u0275\u0275listener("click",function(){return n.onOpenModalForm()}),e.\u0275\u0275element(16,"i",12),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(17,"div",13),e.\u0275\u0275elementStart(18,"div",14),e.\u0275\u0275element(19,"div",13),e.\u0275\u0275elementStart(20,"div",15)(21,"div",16),e.\u0275\u0275element(22,"div",17)(23,"div",18),e.\u0275\u0275elementStart(24,"div",19)(25,"label",20),e.\u0275\u0275text(26,"Buscar:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(27,"div",21)(28,"input",22),e.\u0275\u0275listener("keyup",function(a){return n.applyFilter(a)}),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(29,"table",23),e.\u0275\u0275elementContainerStart(30,24),e.\u0275\u0275template(31,U,2,0,"th",25),e.\u0275\u0275template(32,B,2,1,"td",26),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(33,27),e.\u0275\u0275template(34,Q,2,0,"th",25),e.\u0275\u0275element(35,"th"),e.\u0275\u0275template(36,H,2,1,"td",26),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(37,28),e.\u0275\u0275template(38,J,2,0,"th",25),e.\u0275\u0275element(39,"th"),e.\u0275\u0275template(40,Y,2,1,"td",26),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(41,29),e.\u0275\u0275template(42,q,2,0,"th",25),e.\u0275\u0275element(43,"th"),e.\u0275\u0275template(44,K,2,1,"td",26),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(45,30),e.\u0275\u0275template(46,X,2,0,"th",25),e.\u0275\u0275element(47,"th"),e.\u0275\u0275template(48,Z,2,1,"td",26),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(49,31),e.\u0275\u0275template(50,ee,2,0,"th",25),e.\u0275\u0275template(51,te,8,0,"td",26),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275template(52,ne,1,0,"tr",32),e.\u0275\u0275template(53,ie,1,0,"tr",33),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(54,"mat-paginator",34,35),e.\u0275\u0275elementEnd()()()),2&t&&(e.\u0275\u0275advance(5),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(8,ae)),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(9,re)),e.\u0275\u0275advance(21),e.\u0275\u0275property("dataSource",n.dataSource),e.\u0275\u0275advance(23),e.\u0275\u0275property("matHeaderRowDef",n.displayedColumns),e.\u0275\u0275advance(1),e.\u0275\u0275property("matRowDefColumns",n.displayedColumns),e.\u0275\u0275advance(1),e.\u0275\u0275property("length",n.length)("pageSize",5)("pageSizeOptions",n.pageSizeOptions))},dependencies:[b.rH,c.BZ,c.fO,c.as,c.w1,c.Dz,c.nj,c.XQ,c.Gk,E.NW],styles:[".text[_ngcontent-%COMP%]{color:#000;text-align:left;font-weight:700;margin:10px}.alg[_ngcontent-%COMP%]{text-align:right;align-items:flex-end}.spacer[_ngcontent-%COMP%]{border:none}.spacer2[_ngcontent-%COMP%]{margin:10px}.spacer1[_ngcontent-%COMP%]{flex:1 1 auto;margin-left:40%}"]});const le=[{path:"",component:g}];class p{}p.\u0275fac=function(t){return new(t||p)},p.\u0275mod=e.\u0275\u0275defineNgModule({type:p}),p.\u0275inj=e.\u0275\u0275defineInjector({imports:[b.Bz.forChild(le),b.Bz]});var oe=o(4738);class u{}u.\u0275fac=function(t){return new(t||u)},u.\u0275mod=e.\u0275\u0275defineNgModule({type:u}),u.\u0275inj=e.\u0275\u0275defineInjector({imports:[C.ez,p,oe.q,E.TU,l.UX]})}}]);