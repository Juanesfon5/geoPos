import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  success = false;
  username: string;
  reg: string;

  constructor(private formBuilder: FormBuilder,
    private el: ElementRef, 
    private renderer: Renderer2,
    private serverService: ServerService, 
    private router: Router) { 
  }

  ngOnInit() {
    //this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
    this.messageForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  

  logClick(){
    console.log("Entra");
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    const user = {};
    for (var key in this.messageForm.controls) {
      if (this.messageForm.controls.hasOwnProperty(key)) {
        user[key] = this.messageForm.controls[key].value;
      }
    }
    //let name = this.messageForm.controls['nombre'].value;
    let username = this.messageForm.controls['username'].value;
    let pass = this.messageForm.controls['password'].value;
    this.serverService.login(username, pass );
    //this.success = true;
  }

}
