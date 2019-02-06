import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required]
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

}
