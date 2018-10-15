import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    console.log('navigate to ', feature);
    this.loadedFeature = feature;
  }
}
