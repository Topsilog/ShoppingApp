import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import * as fromAuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    // this.authService.signUpUser(email, password);
    this.store.dispatch(new fromAuthActions.TrySignup({username: email, password: password}))
  }
}
