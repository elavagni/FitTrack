import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  
  constructor(private authService: AuthService) { }


  ngOnInit() {
    this. createForm();
  }

  createForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})});
  }

  onSubmit() {
    this.authService.login({
      email: this.formGroup.value.email,
      password: this.formGroup.value.password
    });
  }

}
