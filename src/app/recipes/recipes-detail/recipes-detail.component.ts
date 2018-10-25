import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
// import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers'; // removed due to centrailize reducer declaration
import * as fromAppRecipeReducer from '../store/recipe.reducers';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss']
})
export class RecipesDetailComponent implements OnInit {
  // chosenRecipeDetail: Recipe;
  recipeState: Observable<fromAppRecipeReducer.State>;
  id: number;

  constructor(private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppRecipeReducer.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']; // recipe id from route
        // this.chosenRecipeDetail = this.recipeService.getRecipe(this.id);
        this.recipeState = this.store.select('recipes');
      }
    )
  }

  onAddToShoppingList () {
    this.store.select('recipes')
    .pipe(
      take(1)
    )
    .subscribe((recipeState: fromAppRecipeReducer.State) => {
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
      // this.store.dispatch(new ShoppingListActions.AddIngredients(this.chosenRecipeDetail.ingredients));
    })
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}
