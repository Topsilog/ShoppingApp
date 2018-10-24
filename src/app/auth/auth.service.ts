import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuthAction from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // authToken: string;
  constructor(private router: Router, private store: Store<fromApp.AppState>) { }

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (response) => {
          console.log("singup success: ", response);
          this.store.dispatch(new fromAuthAction.SignUp());
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => { 
              // this.authToken = token; 
              this.store.dispatch(new fromAuthAction.SetToken(token));
            } // assign token to app/global property
          )
        }
      )
      .catch(
        error => console.log("sign up error: ", error)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => { 
          console.log('success singing in ', response)
          this.store.dispatch(new fromAuthAction.SignIn());
          // then navigate to home once signed in
          this.router.navigate(['/']);
          // get token once signed in
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => { 
              // this.authToken = token; 
              this.store.dispatch(new fromAuthAction.SetToken(token));
            } // assign token to app/global property
          )
        }
      )
      .catch(
        (error) => console.log('error singing in ', error)
      );
  }

  // all will be at redux store auth
  // getToken() {
  //   firebase.auth().currentUser.getIdToken().then(
  //     (token: string) => {
  //       this.authToken = token;
  //     }
  //   );
  //   return this.authToken;
  // }

  // isAuthenticated() {
  //   return this.authToken !== null;
  // }

  logout() {
    firebase.auth().signOut()
    this.store.dispatch(new fromAuthAction.LogOut());
    // this.authToken = null;
    this.router.navigate(['/']);
    console.log('user logged out');
  }
}
