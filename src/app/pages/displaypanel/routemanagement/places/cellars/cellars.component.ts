import { Component, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from '@displaypanel/services/routes/places.service';
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
  selector: 'app-cellars',
  templateUrl: './cellars.component.html',
  styleUrls: ['./cellars.component.scss']
})

export class CellarsComponent implements OnInit {
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
  cellarsform: any;
  displayedColumns: string[] = [ 'idcellars', 'cellar', 'state', 'province','actions' ];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  m: any = [];

  constructor(
    private placeRouteSvc: PlacesService,
    private placeSvc: PlaceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  province: any[] = [];

  ngOnInit(): void {
    this.coordinates = {} as Coordinates;
    this.actionTODO = Action.NEW;
    this.list();
    this.Cellarsform();
  }

  onOpenModalMaps(coordinates={}):void {
    let dialogRef = this.dialog.open( MapsComponent, {
      height: '530px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Maps', coordinates: coordinates },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cellarsform.patchValue({
        cellar: result.address,
        latitude: result.latitude,
        longitude: result.longitude,
      });
      this.cellarsform.updateValueAndValidity();
    });
  }

  list(): void {
    this.cl = true;
    this.placeRouteSvc.GetCellars().subscribe(

      cellars=>{
        this.dataSource.data = cellars;
        this.length = cellars.length;
        this.pageSizeOptions = [5, 10, 20, cellars.length];
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

  Cellarsform(): void {
    this.cellarsform = this.fb.group({
      cellar: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      latitude: [,[Validators.required]],
      longitude: [,[Validators.required]],
      state: [{value: false, disabled: true}],
      idprovince: [{value: '', disabled: true},[Validators.required]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.cellarsform.controls['cellar'].disable();
      this.cellarsform.controls['state'].disable();
      this.cellarsform.controls['idprovince'].disable();
    }else{
      this.cellarsform.controls['cellar'].enable();
      this.cellarsform.controls['state'].enable();
      this.cellarsform.controls['idprovince'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const cellar = this.cellarsform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.placeRouteSvc.PostCellars(cellar).subscribe((res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.cellarsform.reset();
          this.isedit = 0;
          this.cl = false;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.placeRouteSvc.PutCellars(cellar, this.isedit ).subscribe((res: any) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'actulizado',{
            timeOut: 3000,
          });
          this.list();
          this.cellarsform.reset();
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
    this.cellarsform.reset();
    this.isedit = 0;
  }

  Edit(idcellars: string): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.cl = true;
    this.actionTODO = Action.EDIT;
    this.isedit = idcellars;
    if(this.isedit){
      this.placeRouteSvc.GetIdCellars(idcellars).subscribe((res: any)=>{
        this.cellarsform.patchValue({
          cellar: res.cellar,
          latitude: res.latitude,
          longitude: res.longitude,
          state: res.state,
          idprovince: res.idprovince,
        });
        this.cellarsform.updateValueAndValidity();
      });
    }
  }

  cancel(): void {
    this.ed = false;
    this.ed = false;
    this.fromdisable(this.ed);
    this.cellarsform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.placeRouteSvc.DeleteCellars(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
        });
    }
  }

  isvalid(field: string): boolean {
    return (this.cellarsform.get(field).invalid && (this.cellarsform.get(field).dirty || this.cellarsform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.cellarsform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        minlength: `el valor ingresado es menor a ${ minlenght } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }
}

