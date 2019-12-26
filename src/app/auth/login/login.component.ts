import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from "rxjs";

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  formGroup: FormGroup;
  isLoading$: Observable<boolean>;  
  
  constructor(private authService: AuthService,               
              private store: Store<fromRoot.State>)  { }


  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);    
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
