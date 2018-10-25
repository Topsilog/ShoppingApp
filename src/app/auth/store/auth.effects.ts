import { Effect, Actions } from '@ngrx/effects'; 
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
      .ofType(AuthActions.TRY_SINGUP)
      .pipe(
        map((authAction: AuthActions.TrySignup) => {
          return authAction.payload;
        }),
        switchMap((authData: {username: string, password: string}) => {
          return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
          return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
          return [
            {
              type: AuthActions.SIGNUP
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            }
          ]
        })
      );
    
    @Effect()
    authSignin = this.actions$
      .ofType(AuthActions.TRY_SINGIN)
      .pipe(
        map((authAction: AuthActions.TrySignin) => { // map the action and return the payload (username and password from auth.actions.ts)
          return authAction.payload;
        }),
        switchMap((authData: {username: string, password: string}) => { // signin using the credentials from payload from above 'map'
          return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => { // after signing in, return the token
          return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => { // merge all actions to emit/dispatch.
          this.router.navigate(['/']);
          return [
            {
              type: AuthActions.SIGNUP
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            }
          ]
        })
      );
    
      @Effect({dispatch: false})
      authLogout = this.actions$
        .ofType(AuthActions.LOGOUT)
        .pipe(
          tap(() => { 
            this.router.navigate(['/']);
          })
        );
        

    constructor(private actions$: Actions, private router: Router) {}
}