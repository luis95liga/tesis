import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '@displaypanel/services/business/company.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '@app/pages/displaypanel/services/client/client.service';
import { PlacesService } from '@app/pages/displaypanel/services/routes/places.service';
import { async, map, Observable, startWith } from 'rxjs';
import { ClientList } from '@app/shared/models/client.interface';
import { Cellars, CellarsList, Destinations, DestinationsList } from '@app/shared/models/router.interface';
import { GuideService } from '@app/pages/displaypanel/services/guide/guide.service';
import { AuthService } from '@app/pages/auth/auth.service';
import { PlaceService } from '@app/pages/displaypanel/services/business/place.service';
import { Location } from '@app/shared/models/company.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})

export class GuideComponent implements OnInit {

  actionTODO = '';
  displayedColumns: string[] = ['idGuide', 'company', 'location', 'client', 'destinations',  'km', 'status', 'actions','star'];
  dataSource = new MatTableDataSource();
  new: boolean = false;
  edit: boolean = false;
  id: any;
  name: any;
  guiaform: any;
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  m: any;
  clients: ClientList[] = [];
  public origen: any;
  public destino: any;
  t: boolean;
  idCompany: any;
  idguide: any;


  constructor(
    private clientSvc: ClientService,
    private placesSvc: PlacesService,
    private placeSvc: PlaceService,
    private companySvc: CompanyService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private guideSvc: GuideService,
    private authSvc: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.t = false;
   }

  ngOnInit(): void {
    this.List();
    this.GuiaForm();
    this.CreateKm(1,1);
  }

  select(ev: any): void {
    const id = ev.target.value.toLowerCase();
    if(id != ''){
      this.clientSvc.GetIdClient(id).subscribe(
        (client)=>{
          this.placesSvc.GetIdDestinations(client.iddestinations).subscribe(
            (destinations)=>{
              this.guiaform.patchValue({
                names: client.names + ' ' + client.lastnames,
                iddestinations: client.iddestinations,
                destinations: destinations.destinations
              });
              this.guiaform.updateValueAndValidity();
            },
            (err)=>console.log(err)
          );
        },
        (err) => console.error(err)
      );
    }
  }

  List(): void {
    this.clientSvc.GetClient().subscribe(
      (clients: ClientList[]) => {
      this.clients = clients;
    },
    (err)=>console.error(err)
    );
    const user = this.authSvc.userValue;
    this.idCompany = user.idcompany;
    this.idguide = user.user.id;
    this.companySvc.GetIdCompany(user.idcompany).subscribe(
      (company) =>{
        this.placeSvc.GetIdLocation(company.idlocation).subscribe(
          (location) =>{
            this.guiaform.patchValue({
              idlocation: location.idlocation,
              location: location.location,
            });
            this.guiaform.updateValueAndValidity();
          },
          (err) => console.error(err)
        );
      },
      (err) => console.error(err)
    );

    this.guideSvc.GetGuideDeactivateUser(this.idCompany,this.idguide,this.data.idvehicle).subscribe(
      guide=>{
        if(guide.length > 0){
          this.dataSource.data = guide;
          this.length = guide.length;
          this.pageSizeOptions = [5, 10, 20, guide.length];
        }else{
          this.dataSource.data = [];
        }
      },
      (err)=>{
        this.toastr.error('Sin Datos', err,{
          timeOut: 3000,
        });
      }
    );
  }

  GuiaForm(): void {
    this.guiaform = this.fb.group({
      idclient: [, [Validators.required]],
      names: ['', Validators.required],
      idcompany:['', []],
      idlocation: ['', [Validators.required]],
      location: ['',[Validators.required]],
      iddestinations: ['', [Validators.required]],
      destinations: ['', Validators.required],
      km: [''],
      hours: [''],
      status: [false, []],
      idvehicle: [,[]],
      iduser:['',[]],
    });

    this.origen = this.fb.group({
      lat:[''],
      lng:[''],
    });
    this.destino = this.fb.group({
      lat:[''],
      lng:[''],
    });
  }

  Edit(id: number | string): void {
    console.log(id);
    this.actionTODO = Action.EDIT;
    this.edit = !this.edit;
    this.new = !this.new;
    this.guideSvc.GetIdGuide(id).subscribe(
      guide=>{
        this.id = guide.idguide;
        this.guiaform.patchValue({
          idclient: guide.idclient,
          idcompany: guide.idcompany,
          idlocation: guide.idlocation,
          iddestinations: guide.iddestinations,
          km: guide.km,
          hours: guide.hours,
          status: guide.status,
          idvehicle: guide.idvehicle,
          iduser: guide.iduser,
        });
        this.guiaform.updateValueAndValidity();
      });
  }

  CreateKm(idlocation: number | string, iddestinations: number | string) {

    this.placeSvc.GetIdLocation(idlocation).subscribe((location: Location)=>{
      this.origen.patchValue({
        lat: location.latitude,
        lng: location.longitude,
      });
      this.origen.updateValueAndValidity();
    });

    this.placesSvc.GetIdDestinations(iddestinations).subscribe(
      (destinations: Destinations) => {
        this.destino.patchValue({
          lat: destinations.latitude,
          lng: destinations.longitude,
        });
        this.destino.updateValueAndValidity();
      });
  }

  public getDistance(origin: any, destination: any) {
    const matrix = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      matrix.getDistanceMatrix({
        origins: [new google.maps.LatLng(origin.lat, origin.lng)],
        destinations: [new google.maps.LatLng(destination.lat, destination.lng)],
        travelMode: google.maps.TravelMode.DRIVING,
      }, function (response, status) {
        if (status === 'OK') {
          resolve(response);
        } else {
          reject(response);
        }
      });
    })
  }

  New(is: boolean): boolean {
    if (is) {
      if (this.actionTODO === Action.NEW) {
        if (this.guiaform.valid) {
          const data = this.guiaform.value;
          this.CreateKm(data.idlocation, data.iddestinations);
          this.getDistance(this.origen.value, this.destino.value).then(
            (res: any) => {
              const km = Math.round(res.rows[0].elements[0].distance.value/1000);
              const hours = Math.round(res.rows[0].elements[0].duration.value/3600);
              this.guiaform.patchValue({
                idcompany: this.idCompany,
                iduser: this.idguide,
                idvehicle: this.data.idvehicle,
                km: km,
                hours: hours,
                status: false,
              });
              this.guiaform.updateValueAndValidity();
              const d = this.guiaform.value;
              const data = {
                km:  this.guiaform.value.km,
                hours:  this.guiaform.value.hours,
                status:  this.guiaform.value.status,
                idclient:  this.guiaform.value.idclient,
                idcompany:  this.guiaform.value.idcompany,
                idlocation:  this.guiaform.value.idcellars,
                iddestinations:  this.guiaform.value.iddestinations,
                idvehicle: this.data.idvehicle,
                iduser: this.guiaform.value.iduser
              };
              this.guideSvc.PostGuide(d).subscribe(
                (res: any) => {
                  this.m = res;
                  this.toastr.success(this.m.message, 'Creado',{
                    timeOut: 3000,
                  });
                  this.List();
                  this.guiaform.reset();
                  return this.new;
                });
            }
          ).catch(e => console.log(e));
        }else{
          this.toastr.warning('Sin Datos', 'No Hay Registro',{
            timeOut: 3000,
          });
          return this.new;
        }
      }
      if (this.actionTODO === Action.EDIT) {
        const data = this.guiaform.value;
        this.CreateKm(data.idlocation, data.iddestinations);
          this.getDistance(this.origen.value, this.destino.value).then(
            (res: any) => {
              const km = Math.round(res.rows[0].elements[0].distance.value/1000);
              const hours = Math.round(res.rows[0].elements[0].duration.value/3600);
              this.guiaform.patchValue({
                idcompany: this.idCompany,
                iduser: this.idguide,
                idvehicle: this.data.idvehicle,
                status: false,
                km: km,
                hours: hours,
              });
              this.guiaform.updateValueAndValidity();
              const d = this.guiaform.value;
              this.guideSvc.PutGuide(d, this.id).subscribe(
                (res: any)=>{
                  this.m = res;
                  this.toastr.warning(this.m.message, 'actulizado',{
                    timeOut: 3000,
                  });
                  this.List();
                  this.guiaform.reset();
                  this.edit = !this.edit;
                  this.actionTODO = Action.NEW;
                  return this.new
              });
            }
          ).catch(e => console.log(e));
      }
    }
    this.actionTODO = Action.NEW;
    this.edit = !this.edit;
    this.new = !this.new;
    return this.new;
  }

  cancel(is: boolean): boolean {
    this.actionTODO = Action.NEW;
    this.new = !this.new;
    this.guiaform.reset();
    return this.new;
  }

  isvalid(field: string): boolean {
    return (this.guiaform.get(field).invalid && (this.guiaform.get(field).dirty || this.guiaform.get(field).touched));
  }

  getErrorMessage(field: string): string {
    const { errors } = this.guiaform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages: any = {
        required: 'el campo es requerido',
        minlength: `el valor ingresado es menor a ${minlenght} carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey || ''];
    }
    return '';
  }

  delete(id: any): void{
    if (window.confirm('Desea eliminar este Registro')) {
      this.guideSvc.DeleteGuide(id).subscribe((res: any) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.List();
        });
    }
  }

  travels(status: boolean): string {
    if(status){
      return 'Principal'
    }
    return 'Secundario';
  }

}
