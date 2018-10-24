import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducers';
import * as fromAuthReducers from './store/auth.reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
    ) { }

  // route auth guard 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.isAuthenticated();
    return this.store.select('auth').pipe(
      map((authState: fromAuthReducers.State) => {
        return authState.authenticated;
      })
    )
  }
}
