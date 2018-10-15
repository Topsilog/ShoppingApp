import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Adobo', 
      'The famous Filipino cuisine known around the world', 
      'https://tinyurl.com/y7ptxh2b', 
      [
        new Ingredient('Chicken', 21)
      ]
    ),
    new Recipe(
      'Talong Adobo', 
      'Originated from the adobo style but with a different twist', 
      'https://tinyurl.com/y7ptxh2b', 
      [
        new Ingredient('Eggplant', 12)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); //copy of the original array
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientToShoppingList (ingredient: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredient);
  }

  addRecipe(recipe: Recipe) {
    console.log('new recipe added: ', recipe);
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
    
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}