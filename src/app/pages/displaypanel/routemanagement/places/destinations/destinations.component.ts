import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationList } from '@shared/models/company.interface';
import { PlaceService } from '@displaypanel/services/business/place.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MapsComponent } from './components/maps/maps.component';
import { PlacesService } from '@app/pages/displaypanel/services/routes/places.service';

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
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {
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
  destinationsform: any;
  displayedColumns: string[] = [ 'iddestinations', 'destinations', 'state', 'province','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  m: any = [];

  constructor(
    private placeSvc: PlaceService,
    private placeRouteSvc: PlacesService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ) { }

  locality: LocationList[] = [];
  province: any[] = [];

  ngOnInit(): void {
    this.coordinates = {} as Coordinates;
    this.actionTODO = Action.NEW;
    this.list();
    this.Destinationsform();
  }

  onOpenModalMaps(coordinates={}):void {
    let dialogRef = this.dialog.open( MapsComponent, {
      height: '530px',
      width: '600px',
      hasBackdrop: false,
      data: { title: 'Maps', coordinates: coordinates },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.destinationsform.patchValue({
        destinations: result.address,
        latitude: result.latitude,
        longitude: result.longitude,
      });
      this.destinationsform.updateValueAndValidity();
    });
  }

  list(): void {
    this.cl = true;
    this.placeRouteSvc.GetDestinations().subscribe(
      destinations=>{
        this.dataSource.data = destinations;
        this.length = destinations.length;
        this.pageSizeOptions = [5, 10, 20, destinations.length];
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

  Destinationsform(): void {
    this.destinationsform = this.fb.group({
      destinations: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      latitude: [,[Validators.required]],
      longitude: [,[Validators.required]],
      state: [{value: false, disabled: true}],
      idprovince: [{value: '', disabled: true},[Validators.required]],
    });
  }

  fromdisable(is: boolean): void {
    if(!is){
      this.destinationsform.controls['destinations'].disable();
      this.destinationsform.controls['state'].disable();
      this.destinationsform.controls['idprovince'].disable();
    }else{
      this.destinationsform.controls['destinations'].enable();
      this.destinationsform.controls['state'].enable();
      this.destinationsform.controls['idprovince'].enable();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    const destinations = this.destinationsform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.placeRouteSvc.PostDestinations(destinations).subscribe((res: any) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.destinationsform.reset();
          this.isedit = 0;
          this.cl = false;
          this.ed = false;
          this.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.placeRouteSvc.PutDestinations(destinations, this.isedit ).subscribe((res: any) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'actulizado',{
            timeOut: 3000,
          });
          this.list();
          this.destinationsform.reset();
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
    this.destinationsform.reset();
    this.isedit = 0;
  }

  Edit(iddestinations: string): void {
    this.ed = true;
    this.fromdisable(this.ed);
    this.cl = true;
    this.actionTODO = Action.EDIT;
    this.isedit = iddestinations;
    if(this.isedit){
      this.placeRouteSvc.GetIdDestinations(iddestinations).subscribe((res: any)=>{
        this.destinationsform.patchValue({
          destinations: res.destinations,
          latitude: res.latitude,
          longitude: res.longitude,
          state: res.state,
          idprovince: res.idprovince,
        });
        this.destinationsform.updateValueAndValidity();
      });
    }
  }

  cancel(): void {
    this.ed = false;
    this.ed = false;
    this.fromdisable(this.ed);
    this.destinationsform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.placeRouteSvc.DeleteDestinations(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
        });
    }
  }

  isvalid(field: string): boolean {
    return (this.destinationsform.get(field).invalid && (this.destinationsform.get(field).dirty || this.destinationsform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.destinationsform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'El campo es requerido',
        minlength: `El valor ingresado es menor a ${ minlenght } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }
}
