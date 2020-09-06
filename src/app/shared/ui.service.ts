import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
    constructor(private snackbar: MatSnackBar) {}

    showSnackbar(message, action, snackDuration) {
       this.snackbar.open(message, action, {
           duration: snackDuration
       });
    }
}