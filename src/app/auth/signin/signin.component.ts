import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
     
  }

  onSignIn(forms: NgForm) {
    const email = forms.value.email;
    const password = forms.value.password;
    this.authService.signInUser(email, password);
  }

}
