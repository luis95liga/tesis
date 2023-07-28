import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationList } from '@shared/models/company.interface';
import { PlaceService } from '@displaypanel/services/business/place.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MapsComponent } from './components/maps/maps.component';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

interface Coordinates {
  address: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-locality',
  templateUrl: './locality.component.html',
  styleUrls: ['./locality.component.scss']
})
export class LocalityComponent implements OnInit {

  coordinates: Coordinates ={
    address: '',
    latitude: 0,
    longitude: 0
  };

  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  isedit:string | number = 0;
  ed = false;
  cl = false;
  message ='';
  localityform: any;
  displayedColumns: string[] = [ 'idlocation', 'location', 'state', 'province','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  m: any = [];
  constructor(
    private placeSvc: PlaceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  locality: LocationList[] = [];
  province: any[] = [];

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.list();
    this.localityForm();
  }

  onOpenModalMaps(coordinates={}):void {
    let dialogRef = this.dialog.open( MapsComponent, {
      height: '530px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Maps', coordinates: coordinates },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.localityform.patchValue({
        location: result.address,
        latitude: result.latitude,
        longitude: result.longitude,
      });
      this.localityform.updateValueAndValidity();
    });
  }

  list(): void {
    this.cl = true;
    this.placeSvc.GetLocation().subscribe(
      locality=>{
        this.dataSource.data = locality;
        this.length = locality.length;
        this.pageSizeOptions = [5, 10, 20, locality.length];
      },
      err => console.error(err)
    );
    this.placeSvc.GetProvince().subscribe(
      province=>{
        this.province = province;
      },
      err => console.error(err)
    );
  }

  localityForm(): void {
    this.localityform = this.fb.group({
      location: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      latitude: [,[Validators.required]],
      longitude: [,[Validators.required]],
      state: [{value: false, disabled: true}],
      idprovince: [{value: '', disabled: true},[Validators.required]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.localityform.controls['location'].disable();
      this.localityform.controls['state'].disable();
      this.localityform.controls['idprovince'].disable();
    }else{
      this.localityform.controls['location'].enable();
      this.localityform.controls['state'].enable();
      this.localityform.controls['idprovince'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const locality = this.localityform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.placeSvc.PostLocation(locality).subscribe((res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.localityform.reset();
          this.isedit = 0;
          this.cl = false;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.placeSvc.PutLocation(locality, this.isedit ).subscribe((res: any) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'actulizado',{
            timeOut: 3000,
          });
          this.list();
          this.localityform.reset();
          this.isedit = 0;
          this.actionTODO = Action.NEW;
          this.cl = false;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }
  }

  New(): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.cl = true;
    this.actionTODO = Action.NEW;
    this.localityform.reset();
    this.isedit = 0;
  }

  Edit(idlocality: string): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.cl = true;
    this.actionTODO = Action.EDIT;
    this.isedit = idlocality;
    if(this.isedit){
      this.placeSvc.GetIdLocation(idlocality).subscribe((res: any)=>{
        this.localityform.patchValue({
          location: res.location,
          latitude: res.latitude,
          longitude: res.longitude,
          state: res.state,
          idprovince: res.idprovince,
        });
        this.localityform.updateValueAndValidity();
      });
    }
  }

  cancel(): void {
    this.ed = false;
    this.ed = false;
    this.fromdisable(this.ed);
    this.localityform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.placeSvc.DeleteLocation(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
        });
    }
  }

  isvalid(field: string): boolean {
    return (this.localityform.get(field).invalid && (this.localityform.get(field).dirty || this.localityform.get(field).touched));
  }


 errorMessage(field: string): string {
    const  { errors }   = this.localityform.get(field);
    let minlength = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        minlength: `el valor ingresado es menor a ${ minlength } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }

}

