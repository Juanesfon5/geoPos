import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
    return this.http.get(`${this.uri}/geoPos`);
  }

  getUserById(id) {
    return this.http.get(`${this.uri}/geoPos/${id}`);
  }

  getRoutes(){
    return this.http.get(`${this.uri}/getRoutes`);
  }

  addRoute(nombre,arrayRutas){
    console.log("Ruta final");
    console.log(arrayRutas);
    const ruta = {
      name: nombre,
      locations: arrayRutas
    };
    console.log("JSON ruta");
    console.log(ruta);
    return this.http.post(`${this.uri}/getRoutes/addRoute`, ruta); 
  }

  addUser(name, userName, password) {
    const user = {
      name: name,
      userName: userName,
      password: password
    };
    return this.http.post(`${this.uri}/geoPos/add`, user);
  }

  login(userName, password){
    const user = {
      //name: name,
      userName: userName,
      password: password
    };
    return this.http.post(`${this.uri}/geoPos/check`, user).subscribe(data =>{
      if (data['success']){
        this.router.navigate(['home']);
      } else{
        console.log("Usuario o contraseña incorrecta")
        alert("Usuario o contraseña incorrecta");
      }
    });
  }

}
