import { Effect, Actions } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Store } from "@ngrx/store";

import { Recipe } from "../recipe.model";
import * as fromRecipeActions from './recipe.actions';
import * as fromRecipeReducers from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .ofType(fromRecipeActions.FETCH_RECIPES)
    .pipe(
      switchMap((action: fromRecipeActions.FetchRecipes) => {
        return this.http.get<Recipe[]>('https://ng-shopping-app-8ecb0.firebaseio.com/recipes.json', {      
          observe: 'body'
        })
      }),
      map(
        (recipes) => {
          console.log('get new response ', recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return {
            type: fromRecipeActions.SET_RECIPES,
            payload: recipes
          }
        }
      )
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(fromRecipeActions.STORE_RECIPES)
    .pipe(
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', 
          'https://ng-shopping-app-8ecb0.firebaseio.com/recipes.json', 
          // this.recipeService.getRecipes(), 
          state.recipes,
          { reportProgress: true }
        );

        return this.http.request(req);
      })
    );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromRecipeReducers.FeatureState>) {}


}