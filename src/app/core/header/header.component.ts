import { Component, Output, EventEmitter } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent } from '@angular/common/http';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) {}

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