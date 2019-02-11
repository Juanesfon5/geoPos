import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder, private serverService: ServerService, private router: Router) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  thisSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      console.log("Invalido");
      return;
    }

    const regulator = {};
    for (var key in this.messageForm.controls) {
      if (this.messageForm.controls.hasOwnProperty(key)) {
        regulator[key] = this.messageForm.controls[key].value;
      }
    }
    this.success = true;
  }

  register(){
    let name = this.messageForm.controls['nombre'].value;
    let user = this.messageForm.controls['username'].value;
    let pass = this.messageForm.controls['password'].value;
    this.serverService.addUser(name, user, pass).subscribe(() => {
      this.router.navigate([""]);
    });
    console.log(name);
    console.log(user);
    console.log(pass);
  }

}
