import { GoogleService } from '@service/routes/google.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GuideService } from '@service/guide/guide.service';
import { TravelService } from '@service/guide/travel.service';
import { GuideLocationLongitude, Origin } from '@shared/models/guide.interface';

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  zoom: any;

  map: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  // parque simon bolivar
  wayPoints: google.maps.DirectionsWaypoint[] = [];
  origin = {
    lat: 0,
    lng: 0,
  };
  constructor(
    private travelSvc: TravelService,
    private googleSvc: GoogleService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private guideSvc: GuideService,
    private dialogRef: MatDialogRef<MapComponent>
  ) {}

  ngOnInit(): void {
    this.guideSvc.GetGuideLocationLatitude(this.data.id).subscribe(
      (guide: GuideLocationLongitude) =>{
        this.origin = guide.origin[0];
        //
        for(let item of guide.destination){
          this.wayPoints.push({
            'location':new google.maps.LatLng(item.location.lat, item.location.lng ),
            'stopover': true,
          });
        }
        this.loadMap(this.origin);
        //this.wayPoints = guide.destination;
      },
      (err) => console.error(err)
    );
  }

  loadMap(origin: Origin) {
    console.log(origin);
    const mapEle: any = document.getElementById('map');
    const myLatLng = origin;
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 10
    });
    this.directionsDisplay.setMap(this.map);
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.calculateRoute(origin);
      mapEle.classList.add('show-map');
    });
  }


  private calculateRoute(origin: Origin) {
    console.log(this.wayPoints);
    this.directionsService.route({
      origin: origin,
      destination: origin,
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }
}
