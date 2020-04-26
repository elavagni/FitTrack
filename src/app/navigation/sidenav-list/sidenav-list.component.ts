import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {  Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
 
  @Output() closeSidenav  = new EventEmitter
  isAuth: boolean = false;
  private authChange: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authChange = this.authService.authChange.subscribe(isAuth => {
        this.isAuth = isAuth;
    })
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  } 

  onClose() {
    this.closeSidenav.emit();
  }

  ngOnDestroy(): void {
    if (this.authChange) {
      this.authChange.unsubscribe();
    }
    
  }

}
