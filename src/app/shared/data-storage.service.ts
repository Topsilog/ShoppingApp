import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
    private recipeService: RecipeService) { }

  storeRecipe() {
    return this.http.put('https://ng-shopping-app-8ecb0.firebaseio.com/recipes.json', this.recipeService.getRecipes())
      .pipe(map(
        (response) => {
          return response.json();
        }
      ),
      catchError((error: Response) => {
          return throwError(error);
        }
      ))
  }

  getRecipes() {
    this.http.get('https://ng-shopping-app-8ecb0.firebaseio.com/recipes.json')
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
