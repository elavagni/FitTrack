import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  formGroup: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;
  
  constructor(private authService: AuthService, 
              private uiService: UIService,
              private store: Store<{ ui: fromApp.State } >)  { }


  ngOnInit() {
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // })
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

  // ngOnDestroy(): void {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
    
  // }

}
