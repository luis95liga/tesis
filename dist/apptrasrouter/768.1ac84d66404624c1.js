"use strict";(self.webpackChunkapptrasrouter=self.webpackChunkapptrasrouter||[]).push([[768],{2768:(W,y,l)=>{l.r(y),l.d(y,{VehicleTypeModule:()=>m});var u=l(6895),f=l(9299),a=l(4006),s=l(671),e=l(4650),g=l(2965),b=l(7185),_=l(7974),C=l(5829);const T=["scheduledOrdersPaginator"];function S(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"small",46),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=e.\u0275\u0275nextContext();e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate1(" ",n.errorMessage("name")," ")}}function V(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",47),e.\u0275\u0275text(1,"Id"),e.\u0275\u0275elementEnd())}function E(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"td",48),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.idvehicle_type)}}function x(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",47),e.\u0275\u0275text(1,"Uso del Vehiculo"),e.\u0275\u0275elementEnd())}function O(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"td",48),e.\u0275\u0275text(1),e.\u0275\u0275elementEnd()),2&i){const n=t.$implicit;e.\u0275\u0275advance(1),e.\u0275\u0275textInterpolate(n.name)}}function w(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",47),e.\u0275\u0275text(1,"Depende de Otro"),e.\u0275\u0275elementEnd())}function k(i,t){if(1&i&&(e.\u0275\u0275elementStart(0,"td",48)(1,"div",49),e.\u0275\u0275element(2,"input",50),e.\u0275\u0275elementEnd()()),2&i){const n=t.$implicit;e.\u0275\u0275advance(2),e.\u0275\u0275property("checked",n.depends_other_vehicle)}}function D(i,t){1&i&&(e.\u0275\u0275elementStart(0,"th",47),e.\u0275\u0275text(1,"Actiones"),e.\u0275\u0275elementEnd())}function I(i,t){if(1&i){const n=e.\u0275\u0275getCurrentView();e.\u0275\u0275elementStart(0,"td",48)(1,"div",51)(2,"button",52),e.\u0275\u0275listener("click",function(){const h=e.\u0275\u0275restoreView(n).$implicit,v=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(v.edit(h))}),e.\u0275\u0275element(3,"i",53),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(4,"button",54),e.\u0275\u0275listener("click",function(){const h=e.\u0275\u0275restoreView(n).$implicit,v=e.\u0275\u0275nextContext();return e.\u0275\u0275resetView(v.delete(h.idvehicle_type))}),e.\u0275\u0275element(5,"i",55),e.\u0275\u0275elementEnd()()()}}function M(i,t){1&i&&e.\u0275\u0275element(0,"tr",56)}function z(i,t){1&i&&e.\u0275\u0275element(0,"tr",57)}const N=function(){return["/displaypanel"]},j=function(){return["/displaypanel/vehicle/"]},F=function(i,t){return{"is-invalid":i,"is-valid":t}};var r=(()=>{return(i=r||(r={})).EDIT="edit",i.NEW="new",r;var i})();class d{set paginator(t){t&&(this.dataSource.paginator=t)}constructor(t,n,o){this.catalogueSvc=t,this.fb=n,this.toastr=o,this.actionTODO="",this.isedit=0,this.message="",this.displayedColumns=["idvehicle_type","name","depends_other_vehicle","actions"],this.dataSource=new s.by,this.length=0,this.pageSize=10,this.pageSizeOptions=[],this.ed=!1,this.vehicletypes=[],this.vehicletype=[]}ngOnInit(){this.actionTODO=r.NEW,this.list(),this.vehicletypeForm()}list(){this.ed=!1,this.catalogueSvc.GetVehicleType().subscribe(t=>{this.dataSource.data=t,this.length=t.length,this.pageSizeOptions=[5,10,20,t.length]},t=>console.error(t))}vehicletypeForm(){this.vehicletypeform=this.fb.group({name:[{value:"",disabled:!0},[a.kI.required,a.kI.minLength(4)]],depends_other_vehicle:[{value:!1,disabled:!0},[]]})}fromdisable(t){t?(this.vehicletypeform.controls.name.enable(),this.vehicletypeform.controls.depends_other_vehicle.enable()):(this.vehicletypeform.controls.name.disable(),this.vehicletypeform.controls.depends_other_vehicle.disable())}applyFilter(t){this.dataSource.filter=t.target.value.trim().toLowerCase()}save(){const t=this.vehicletypeform.value;0==this.isedit?this.actionTODO===r.NEW&&this.catalogueSvc.PostVehicleType(t).subscribe(n=>{this.m=n,this.toastr.success(this.m.message,"Creado",{timeOut:3e3}),this.list(),this.vehicletypeform.reset(),this.isedit=0,this.ed=!1,this.fromdisable(this.ed)}):this.actionTODO===r.EDIT&&this.catalogueSvc.PutVehicleType(t,this.isedit).subscribe(n=>{this.m=n,this.toastr.warning(this.m.message,"Actualizado",{timeOut:3e3}),this.list(),this.vehicletypeform.reset(),this.isedit=0,this.actionTODO=r.NEW,this.ed=!1,this.fromdisable(this.ed)})}New(){this.actionTODO=r.NEW,this.vehicletypeform.reset(),this.isedit=0,this.ed=!0,this.fromdisable(this.ed),this.vehicletypeform.patchValue({depends_other_vehicle:!1}),this.vehicletypeform.updateValueAndValidity()}edit(t){this.ed=!0,this.fromdisable(this.ed),this.actionTODO=r.EDIT,this.isedit=t.idvehicle_type,this.vehicletypeform.patchValue({name:t.name,depends_other_vehicle:t.depends_other_vehicle}),this.vehicletypeform.updateValueAndValidity()}cancel(){this.vehicletypeform.reset(),this.isedit=0,this.actionTODO=r.NEW,this.ed=!1,this.fromdisable(this.ed)}delete(t){window.confirm("Desea eliminar este Registro")&&this.catalogueSvc.DeleteVehicleType(t).subscribe(n=>{this.toastr.error("Registro Eliminado","Eliminado",{timeOut:3e3}),this.list()})}isvalid(t){return this.vehicletypeform.get(t).invalid&&(this.vehicletypeform.get(t).dirty||this.vehicletypeform.get(t).touched)}errorMessage(t){const{errors:n}=this.vehicletypeform.get(t);let o=n?.minlength?.requiredLength;return n?{required:"el campo es requerido",minlength:`el valor ingesado es menor a ${o} carateres`}[Object.keys(n).find(Boolean)||""]:""}}d.\u0275fac=function(t){return new(t||d)(e.\u0275\u0275directiveInject(g.k),e.\u0275\u0275directiveInject(a.qu),e.\u0275\u0275directiveInject(b._W))},d.\u0275cmp=e.\u0275\u0275defineComponent({type:d,selectors:[["app-vehicle-type"]],viewQuery:function(t,n){if(1&t&&e.\u0275\u0275viewQuery(T,5),2&t){let o;e.\u0275\u0275queryRefresh(o=e.\u0275\u0275loadQuery())&&(n.paginator=o.first)}},decls:67,vars:18,consts:[[1,"container-fluid"],[1,"mt-4"],["aria-label","breadcrumb",1,"breadcrumb",2,"--bs-breadcrumb-divider","url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")"],[1,"breadcrumb-item"],[3,"routerLink"],[1,"fa-solid","fa-house"],[1,"breadcrumb-item","active"],[1,"form-group","d-flex","justify-content-between"],[1,"fw-bold"],["type","button",1,"btn","btn-lg","btn-primary","btn-sm",3,"click"],[1,"fa-solid","fa-plus"],[1,"mt-1"],[1,"card"],[1,"card-body",3,"formGroup"],[1,"row"],[1,"col-sm-6"],[1,"form-group","row"],[1,"col-sm-4","col-form-label","fw-bold"],[1,"col-sm-8"],["type","text","placeholder","Nombres","formControlName","name",1,"form-control","form-control-sm",3,"ngClass"],["class","form-text text-danger",4,"ngIf"],[1,"col-sm-5"],[1,"form-check","mt-1"],["type","checkbox","checked","","formControlName","depends_other_vehicle",1,"form-check-input"],[1,"form-check-label"],[1,"col-sm-1"],["type","button",1,"spacer","btn","btn-outline-success","btn-sm",3,"disabled","click"],[1,"fa-solid","fa-floppy-disk"],["type","button",1,"spacer","btn","btn-outline-danger","btn-sm",3,"disabled","click"],[1,"fa-solid","fa-trash"],[1,"card-body"],[1,"d-flex","justify-content-between"],[1,"mb-1","row","text-black"],[1,"spacer1"],["type","text","placeholder","Buscar",1,"form-control","form-control-sm",3,"keyup"],["mat-table","",1,"table","table-striped","table-hover",3,"dataSource"],["matColumnDef","idvehicle_type"],["scope","col",4,"matHeaderCellDef"],["scope","row",4,"matCellDef"],["matColumnDef","name"],["matColumnDef","depends_other_vehicle"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page",3,"length","pageSize","pageSizeOptions"],["scheduledOrdersPaginator",""],[1,"form-text","text-danger"],["scope","col"],["scope","row"],[1,"form-check","form-switch"],["type","checkbox","disabled","",1,"form-check-input",3,"checked"],[1,""],[1,"spacer","btn","btn-outline-warning",3,"click"],[1,"fa-solid","fa-file-pen"],[1,"spacer","btn","btn-outline-danger",3,"click"],[1,"fa-solid","fa-trash-can"],["mat-header-row",""],["mat-row",""]],template:function(t,n){1&t&&(e.\u0275\u0275elementStart(0,"div",0),e.\u0275\u0275element(1,"div",1),e.\u0275\u0275elementStart(2,"ol",2)(3,"li",3)(4,"a",4),e.\u0275\u0275element(5,"i",5),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(6,"li",3)(7,"a",4),e.\u0275\u0275text(8,"Veh\xedculos"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(9,"li",6),e.\u0275\u0275text(10,"Uso de Veh\xedculo"),e.\u0275\u0275elementEnd()(),e.\u0275\u0275elementStart(11,"div",7)(12,"h4",8),e.\u0275\u0275text(13,"Tipos de Veh\xedculos"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(14,"button",9),e.\u0275\u0275listener("click",function(){return n.New()}),e.\u0275\u0275element(15,"i",10),e.\u0275\u0275elementEnd()(),e.\u0275\u0275element(16,"div",11),e.\u0275\u0275elementStart(17,"div",12)(18,"form",13)(19,"div",14)(20,"div",15)(21,"div",16)(22,"label",17),e.\u0275\u0275text(23,"Tipo de Veh\xedculo:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(24,"div",18),e.\u0275\u0275element(25,"input",19),e.\u0275\u0275template(26,S,2,1,"small",20),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(27,"div",21)(28,"div",22),e.\u0275\u0275element(29,"input",23),e.\u0275\u0275elementStart(30,"label",24),e.\u0275\u0275text(31," Depende de otro Vehiculo "),e.\u0275\u0275elementEnd()()(),e.\u0275\u0275elementStart(32,"div",25)(33,"button",26),e.\u0275\u0275listener("click",function(){return n.save()}),e.\u0275\u0275element(34,"i",27),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(35,"button",28),e.\u0275\u0275listener("click",function(){return n.cancel()}),e.\u0275\u0275element(36,"i",29),e.\u0275\u0275elementEnd()()()()(),e.\u0275\u0275element(37,"div",11),e.\u0275\u0275elementStart(38,"div",12)(39,"div",30)(40,"div",31),e.\u0275\u0275element(41,"div",32)(42,"div",33),e.\u0275\u0275elementStart(43,"div",16)(44,"label",17),e.\u0275\u0275text(45,"Buscar:"),e.\u0275\u0275elementEnd(),e.\u0275\u0275elementStart(46,"div",18)(47,"input",34),e.\u0275\u0275listener("keyup",function(p){return n.applyFilter(p)}),e.\u0275\u0275elementEnd()()()(),e.\u0275\u0275elementStart(48,"table",35),e.\u0275\u0275elementContainerStart(49,36),e.\u0275\u0275template(50,V,2,0,"th",37),e.\u0275\u0275template(51,E,2,1,"td",38),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(52,39),e.\u0275\u0275template(53,x,2,0,"th",37),e.\u0275\u0275element(54,"th"),e.\u0275\u0275template(55,O,2,1,"td",38),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(56,40),e.\u0275\u0275template(57,w,2,0,"th",37),e.\u0275\u0275element(58,"th"),e.\u0275\u0275template(59,k,3,1,"td",38),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275elementContainerStart(60,41),e.\u0275\u0275template(61,D,2,0,"th",37),e.\u0275\u0275template(62,I,6,0,"td",38),e.\u0275\u0275elementContainerEnd(),e.\u0275\u0275template(63,M,1,0,"tr",42),e.\u0275\u0275template(64,z,1,0,"tr",43),e.\u0275\u0275elementEnd(),e.\u0275\u0275element(65,"mat-paginator",44,45),e.\u0275\u0275elementEnd()()()),2&t&&(e.\u0275\u0275advance(4),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(13,N)),e.\u0275\u0275advance(3),e.\u0275\u0275property("routerLink",e.\u0275\u0275pureFunction0(14,j)),e.\u0275\u0275advance(11),e.\u0275\u0275property("formGroup",n.vehicletypeform),e.\u0275\u0275advance(7),e.\u0275\u0275property("ngClass",e.\u0275\u0275pureFunction2(15,F,n.isvalid("name"),n.vehicletypeform.get("name").valid)),e.\u0275\u0275advance(1),e.\u0275\u0275property("ngIf",n.isvalid("name")||!1),e.\u0275\u0275advance(7),e.\u0275\u0275property("disabled",!n.vehicletypeform.valid),e.\u0275\u0275advance(2),e.\u0275\u0275property("disabled",!n.ed),e.\u0275\u0275advance(13),e.\u0275\u0275property("dataSource",n.dataSource),e.\u0275\u0275advance(15),e.\u0275\u0275property("matHeaderRowDef",n.displayedColumns),e.\u0275\u0275advance(1),e.\u0275\u0275property("matRowDefColumns",n.displayedColumns),e.\u0275\u0275advance(1),e.\u0275\u0275property("length",n.length)("pageSize",5)("pageSizeOptions",n.pageSizeOptions))},dependencies:[u.mk,u.O5,f.rH,s.BZ,s.fO,s.as,s.w1,s.Dz,s.nj,s.XQ,s.Gk,_.NW,C.oO,a._Y,a.Fj,a.Wl,a.JJ,a.JL,a.sg,a.u],styles:[".spacer[_ngcontent-%COMP%]{border:none}.spacer2[_ngcontent-%COMP%]{margin:10px}.spacer1[_ngcontent-%COMP%]{flex:1 1 auto;margin-left:40%}table[_ngcontent-%COMP%]{width:100%}.spacer1[_ngcontent-%COMP%]{flex:1 1 auto}"]});const R=[{path:"",component:d}];class c{}c.\u0275fac=function(t){return new(t||c)},c.\u0275mod=e.\u0275\u0275defineNgModule({type:c}),c.\u0275inj=e.\u0275\u0275defineInjector({imports:[f.Bz.forChild(R),f.Bz]});var P=l(4738);class m{}m.\u0275fac=function(t){return new(t||m)},m.\u0275mod=e.\u0275\u0275defineNgModule({type:m}),m.\u0275inj=e.\u0275\u0275defineInjector({imports:[u.ez,c,P.q,a.UX]})}}]);