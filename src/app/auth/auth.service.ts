import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI  from '../shared/ui.actions';

@Injectable()
export class AuthService {
    
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, 
                private trainingService: TrainingService,                
                private uiService: UIService,
                private store: Store<fromRoot.State>) {}

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
        this.store.dispatch(new UI.StartLoading())   
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email, 
            authData.password)
        .then(result => {                                  
            this.store.dispatch(new UI.StopLoading())   
        })
        .catch(error => {            
            this.store.dispatch(new UI.StopLoading())   
            this.uiService.showSnackbar(error.message, null, {
                duration: 3000
            });
        });
    }

    login(authData: AuthData) {        
        this.store.dispatch(new UI.StartLoading())   
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
        .then(result => {                        
            this.store.dispatch(new UI.StopLoading())   
            console.log(result);
        })
        .catch(error => {            
            this.store.dispatch(new UI.StopLoading())   
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