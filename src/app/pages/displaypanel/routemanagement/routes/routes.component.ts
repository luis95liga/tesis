import { Component, OnInit } from '@angular/core';

interface WayPoint {
  location: {
    lat: number,
    lng: number,
  };
  stopover: boolean;
}

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  coordenadas: any;
  zoom: number = 0;
  map: any;
  wayPoints: google.maps.DirectionsWaypoint[] = [
    {
      location: new google.maps.LatLng({lat: -0.1806532 , lng: -78.4678382  }), // Jardín Botánico
      stopover: true,
    },
    {
      location: new google.maps.LatLng({ lat:  -2.9001285 , lng: -79.00589649999999 }), // Parque la 93
      stopover: true,
    },
    {
      location: new google.maps.LatLng({ lat: 0.9681789, lng: -79.6517202}), // Maloka
      stopover: true,
    },
  ];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  origin = { lat:0.8129715  , lng: -77.712925 };

  destination = { lat: -2.1894128 , lng: -79.8890662 }

  constructor(){}

  ngOnInit(): void {
    this.setCurrentLocation();
    this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map')!;
    const indicatorsEle: HTMLElement = document.getElementById('indicators')!;
    this.map = new google.maps.Map(mapEle,{
      center: this.origin,
      zoom: 12
    });

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(indicatorsEle);

    google.maps.event.addListenerOnce(this.map, 'idle',()=>{
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });

  }

  private calculateRoute() {
    const waypts: google.maps.DirectionsWaypoint[] = []
    this.directionsService.route({
      origin: this.origin,
      destination: this.origin,
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

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordenadas.latitude = position.coords.latitude;
        this.coordenadas.longitude = position.coords.longitude;
        this.zoom = 15;
        //this.getAddress(this.coordenadas.latitude, this.coordenadas.longitude);
      });
    }
  }

}
