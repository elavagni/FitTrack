import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
    
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, 
                private trainingService: TrainingService,                
                private uiService: UIService,
                private store: Store<{ui: fromApp.State}>) {}

    initAuthListener() {
        this.afAuth.authState.subscribe( user=> {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();      
                this.authChange.next(false);
                this.router.navigate(['/login'])
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch({ type: 'START_LOADING'})   
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password)
        .then(result => {                      
            //this.uiService.loadingStateChanged.next(true);
            this.store.dispatch({ type: 'STOP_LOADING'})   
        })
        .catch(error => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch({ type: 'STOP_LOADING'})   
            this.uiService.showSnackbar(error.message, null, {
                duration: 3000
            });
        });
    }

    login(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch({ type: 'START_LOADING'})           
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
        .then(result => {            
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch({ type: 'STOP_LOADING'})   
            console.log(result);
        })
        .catch(error => {
            //this.uiService.loadingStateChanged.next(false);
            this.store.dispatch({ type: 'STOP_LOADING'})   
            this.uiService.showSnackbar(error.message, null, {
               duration: 3000
           });
        })        
    }

    logout() {
        this.afAuth.auth.signOut();        
    }
  
    isAuth() {        
        return  this.isAuthenticated;
    }

}