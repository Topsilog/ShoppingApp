import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers'; // global reducers
import * as fromAuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    // private authService: AuthService
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
     
  }

  onSignIn(forms: NgForm) {
    const email = forms.value.email;
    const password = forms.value.password;
    // this.authService.signInUser(email, password);
    this.store.dispatch(new fromAuthActions.TrySignin({username: email, password: password}));
  }

}
