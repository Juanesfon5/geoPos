import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
    private renderer: Renderer2) { 
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
    //this.apiService.authenticate(user);
    this.success = true;
  }

}
