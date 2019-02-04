import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'Tu localización';
  zoom: number = 14;
  lat: any;
  lng: any;

  constructor() { 
    if (navigator)
    { setInterval(()=>{
      navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    },3000)
    }
  }

  ngOnInit() {
  }

}
