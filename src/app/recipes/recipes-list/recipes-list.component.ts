import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

// import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as fromAppRecipeReducer from '../store/recipe.reducers';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  // recipesState: Observable<fromAppRecipeReducer.State>;
  recipesState: Observable<{recipes: Recipe[]}>;
  subscription: Subscription;
  
  constructor(
    // private recipeList: RecipeService, 
    private router: Router, private route: ActivatedRoute,
    private store: Store<fromAppRecipeReducer.FeatureState>) { }

  ngOnInit() {
    // this.subscription = this.recipeList.recipesChanged
    //   .subscribe(
    //     (recipes: Recipe[]) => {
    //       this.recipes = recipes;
    //     }
    //   );
    // this.recipes = this.recipeList.getRecipes();
    this.recipesState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
