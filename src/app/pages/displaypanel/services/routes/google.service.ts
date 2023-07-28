import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {


  private userLocation = new BehaviorSubject<[number, number]>([0,0]);

  get $userLocation(): [number, number] {
    return this.userLocation.getValue();
  }

  public isUSerLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number,number]> {
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({ coords })=> {
          const data:any = resolve([coords.longitude, coords.latitude]);
          resolve([coords.longitude, coords.latitude]);
        },
        (err)=>{
          alert('no se pudo obtener la geolocalisación')
          console.log(err);
          reject()
        }
      );
    });
  }
}
