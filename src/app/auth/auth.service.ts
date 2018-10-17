import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: string;
  constructor(private router: Router) { }

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (response) => {
          console.log("singup success: ", response);
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
          // then navigate to home once signed in
          this.router.navigate(['/']);
          // get token once signed in
          firebase.auth().currentUser.getIdToken().then(
            (token: string) => { this.authToken = token; } // assign token to app/global property
          )
        }
      )
      .catch(
        (error) => console.log('error singing in ', error)
      );
  }

  getToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => {
        this.authToken = token;
      }
    );
    return this.authToken;
  }

  isAuthenticated() {
    return this.authToken !== null;
  }

  logout() {
    firebase.auth().signOut()
    this.authToken = null;
    console.log('user logged out');
  }
}
