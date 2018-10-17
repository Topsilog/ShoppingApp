import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyC_zTqR9fG2ImgKGwzSEYirqG3fPWXYvI0",
      authDomain: "ng-shopping-app-8ecb0.firebaseapp.com"
    });
  }

  onNavigate(feature: string) {
    console.log('navigate to ', feature);
    this.loadedFeature = feature;
  }


}
