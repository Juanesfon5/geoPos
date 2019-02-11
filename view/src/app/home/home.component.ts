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
  trk: boolean = false;
  isPlayed: boolean = false;
  private interval;

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

  play(){
    this.isPlayed = true;
    this.test();
    console.log(this.isPlayed);
  }

  stop(){
    this.isPlayed = false;
    clearInterval(this.interval);
    //this.test();
    console.log(this.isPlayed);
  }

  test(){


  this.interval = setInterval(() => {
      if (this.isPlayed) {
          console.log('playing');
      } else {
          console.log('stopped');
      }
  }, 1000);
  }

  tracking(){

  }

}
