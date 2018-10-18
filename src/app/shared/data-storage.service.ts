import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';

import { RecipeService } from '../recipes/recipe.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipe() {
    const token = this.authService.getToken(); //get token from auth service
    const headers = new HttpHeaders().set('Authorization', 'Bearer <token>');

    // return this.http.put('https://ng-shopping-app-8ecb0.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   // headers: headers,
    //   params: new HttpParams().set('auth', token),
    //   reportProgress: true
    // })
    //   .pipe(map(
    //     (response) => {
    //       return response;
    //     }
    //   ),
    //   catchError((error: Response) => {
    //       return throwError(error);
    //     }
    //   ))

    const req = new HttpRequest('PUT', 
      'https://ng-shopping-app-8ecb0.firebaseio.com/recipes.json', 
      this.recipeService.getRecipes(), 
      {
        reportProgress: true
      });

      return this.http.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken(); //get token from auth service

    // this.http.get<Recipe[]>('https://ng-shopping-app-8ecb0.firebaseio.com/recipes.json?auth=' + token, {
    this.http.get<Recipe[]>('https://ng-shopping-app-8ecb0.firebaseio.com/recipes.json', {      
      observe: 'body'
    })
      .pipe(map(
        (recipes) => {
          console.log('get new response ', recipes);
          // for (let recipe of recipes) {
          //   if (!recipe['ingredients']) {
          //     recipe['ingredients'] = [];
          //   }
          // }
          // console.log('recipes fetch success ', recipes);
          // return recipes;
          return [];
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
