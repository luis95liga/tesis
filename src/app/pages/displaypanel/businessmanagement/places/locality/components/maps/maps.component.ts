import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  @ViewChild("placesRef") placesRef! : GooglePlaceDirective;

  coordenadas = {
    latitude: 0,
    longitude: 0,
    address: '',
  }

  options ={
    types: [],
    componentRestrictions: { country: 'EC' },
  } as unknown as Options;

  title: string = 'AGM project';
  address: any;
  private geoCoder: any;
  zoom: any;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    public dialog: MatDialogRef<MapsComponent>,
    ) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
  }

  public handleAddressChange(address: Address) {
    this.coordenadas.latitude = address.geometry.location.lat();
    this.coordenadas.longitude = address.geometry.location.lng();
    this.getAddress(this.coordenadas.latitude, this.coordenadas.longitude);
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordenadas.latitude = position.coords.latitude;
        this.coordenadas.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.coordenadas.latitude, this.coordenadas.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    this.coordenadas.latitude = $event.latLng.lat();
    this.coordenadas.longitude = $event.latLng.lng();
    this.getAddress(this.coordenadas.latitude, this.coordenadas.longitude);
  }

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results:any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.coordenadas.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  save(): void {
    if(this.coordenadas){
      this.dialog.close(this.coordenadas);
    }
  }
}

