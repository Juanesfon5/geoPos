import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

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
  isPlayed: boolean = false;
  private interval;
  myArray = new Array();
  routes: any;
  i: number;
  pressed: boolean;

  constructor(private serverService: ServerService) { 
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
    this.i = 1;
    this.pressed = false;
  }

  play(){
    this.isPlayed = true;
    this.test();
    console.log(this.isPlayed);
  }

  stop(){
    this.isPlayed = false;
    clearInterval(this.interval);
    //Aqui se envía el array a la base de datos
    let index = "Ruta "+ this.i;
    this.serverService.addRoute(index ,this.myArray).subscribe(()=>{ });
    this.myArray = [];
    this.i = this.i + 1;
    console.log("array emptied");
    console.log(this.myArray);
    console.log(this.isPlayed);
  }

  test(){
    let i = 0;
    this.interval = setInterval(() => {
      if (this.isPlayed) {
        navigator.geolocation.getCurrentPosition( pos => {
          this.lng = +pos.coords.longitude;
          this.lat = +pos.coords.latitude;
        });
        var loc = {"lat": this.lat, "lng": this.lng};
        this.myArray[i] = loc;
        console.log(this.myArray);
        //console.log(i);
        i++;
        console.log('playing');
      } else {
        console.log('stopped');
      }
    }, 1000);
  }

  showRoutes(){
    console.log(this.pressed)
    this.serverService.getRoutes().subscribe(
      data => {
        console.log(data)
        this.routes = data;
      }      
    );
    if (this.pressed){
      this.pressed = false;
    } else if (this.pressed == false){
      this.pressed = true;
    }
    
    console.log(this.pressed)
  }
}