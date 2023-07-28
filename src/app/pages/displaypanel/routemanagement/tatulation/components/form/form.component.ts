import { AuthService } from './../../../../../auth/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PlacesService } from '@app/pages/displaypanel/services/routes/places.service';
import { PlaceService } from '@app/pages/displaypanel/services/business/place.service';
import { TabulationService } from '@app/pages/displaypanel/services/routes/tabulation.service';
import { LocationList, Location } from '@app/shared/models/company.interface';
import { Destinations, DestinationsList, Tabulation } from '@app/shared/models/router.interface';
import { ToastrService } from 'ngx-toastr';

enum Action {
   EDIT = 'edit',
   NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  actionTODO = '';
  id: number = 0;
  tatulationform: any;
  idcompany: any;
  message: any;
  private isValidnum = /(?=\w*[1-9])/;
  location: LocationList[] = [];
  destinations: DestinationsList[] = [];
  destinationsform: any;
  locationform: any;
  m: any;

  constructor (
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authSvc: AuthService,
    private placesSvc: PlacesService,
    private placeSvc: PlaceService,
    private tabulationSvc: TabulationService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FormComponent>
  ) {}

  ngOnInit(): void {
    this.TatulationForm();
    this.List();
    this.tatulationform.get('idcompany').setValue(this.idcompany);
  }

  List():  void {
    this.idcompany = this.authSvc.userValue.idcompany;
    if(this.data.route.idtabulation){
      this.id = this.data.route.idtabulation;
      this.actionTODO = Action.EDIT;
      this.tabulationSvc.GetIdTabulation(this.data.route.idtabulation).subscribe(
        (tabulation: Tabulation)=>{
          this.tatulationform.patchValue({
            idlocation: tabulation.idlocation,
            iddestinations: tabulation.iddestinations,
            km: tabulation.km,
            hours: tabulation.hours,
            idcompany: tabulation.idcompany,
          });
          this.CreateKm(tabulation.idlocation, tabulation.iddestinations);
          this.tatulationform.updateValueAndValidity();
        },
        (err)=> console.error(err)
      );
    }else{
      this.actionTODO = Action.NEW;
    }
    this.placeSvc.GetLocation().subscribe(
      (location: LocationList[])=>{
        this.location = location;
      },
      (err)=> console.log(err)
    );

    this.placesSvc.GetDestinations().subscribe(
      (destinations: DestinationsList[])=>{
        this.destinations = destinations;
      },
      (err)=> console.log(err)
    );
  }

  TatulationForm(): void {
    this.tatulationform = this.fb.group({
      idlocation: [,[ Validators.required ]],
      iddestinations: [,[ Validators.required ]],
      km: [,[ Validators.required, Validators.min(1), Validators.pattern(this.isValidnum) ]],
      hours: [,[ Validators.required ]],
      idcompany: [],
    });

    this.locationform = this.fb.group({
      lat:[''],
      lng:[''],
    });

    this.destinationsform = this.fb.group({
      lat:[''],
      lng:[''],
    });
  }

  save(): void {

    if(this.tatulationform.invalid) {
      return;
    }

    const data = this.tatulationform.value;
    if(this.actionTODO === Action.NEW ) {
      this.tabulationSvc.PostTabulation(data).subscribe(
        (res: any)=>{
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        },
        (err)=> console.error(err)
      );
    }

    if(this.actionTODO === Action.EDIT ) {
      this.tabulationSvc.PutTabulation(data, this.id).subscribe(
        (res: any)=>{
          this.m = res;
          this.toastr.warning(this.m.message, 'Actulizado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        },
        (err)=> console.error(err)
      );
    }
  }

  CreateKm(idlocation: number | string, iddestinations: number | string) {
    this.placeSvc.GetIdLocation(idlocation).subscribe(
      (location: Location)=>{
      this.locationform.patchValue({
        lat: location.latitude,
        lng: location.longitude,
      });
      this.locationform.updateValueAndValidity();
    });

    this.placesSvc.GetIdDestinations(iddestinations).subscribe(
      (destinations: Destinations) => {
        this.destinationsform.patchValue({
          lat: destinations.latitude,
          lng: destinations.longitude,
        });
        this.destinationsform.updateValueAndValidity();
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

  genear():void{
    const data = this.tatulationform.value;
    this.CreateKm(data.idlocation, data.iddestinations);
    this.getDistance(this.locationform.value, this.destinationsform.value).then(
      (res: any) => {
        console.log(res);
        const km = Math.round(res.rows[0].elements[0].distance.value/1000);
        const hours = Math.round(res.rows[0].elements[0].duration.value/3600);
        this.tatulationform.patchValue({
          km: km,
          hours: hours,
        });
        this.tatulationform.updateValueAndValidity();
        this.locationform.reset();
        this.destinationsform.reset();
      }
    ).catch(e => console.error(e));
  }

  isvalid(field: string): boolean {
    return (this.tatulationform.get(field).invalid && (this.tatulationform.get(field).dirty || this.tatulationform.get(field).touched));
  }

  errorMessage(field: string): string {
    const  { errors }   = this.tatulationform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'el campo es requerido',
        minlength: `el Texto ingresado tiene menos de ${ minlenght } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }

}
