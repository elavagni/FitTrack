import { Subject } from "rxjs";
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
    loadingStateChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar) {}

    showSnackbar(message, action, snackDuration) {
       this.snackbar.open(message, action, {
           duration: snackDuration
       });
    }
}