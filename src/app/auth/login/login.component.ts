import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from "rxjs";

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
 
  formGroup: FormGroup;
  isLoading: boolean = false;
  private loadingSubs: Subscription;
  
  constructor(private authService: AuthService, private uiService: UIService) { }


  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
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

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

}
