import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>; // watch directly on auth reducer
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorageService.storeRecipe()
      .subscribe(
        // (response: Response) => {
        (response) => {
          console.log("response success ", response);
        },
        (errors: Response) => {
          console.log("error occured ", errors);
        }
      )
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

}