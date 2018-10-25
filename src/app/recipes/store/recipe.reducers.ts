import { Ingredient } from "src/app/shared/ingredient.model";
import { Recipe } from "../recipe.model";
import * as fromRecipeActions from "./recipe.actions";
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: fromRecipeActions.RecipeActions) {
  switch(action.type) {
    case (fromRecipeActions.SET_RECIPE):
      return {
        ...state,
        recipes: [...action.payload]
      };
    case (fromRecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case(fromRecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.UpdateRecipe
      };
      const recipes = [...state.recipes];
      return {
        ...state,
        recipes: recipes
      };
    case (fromRecipeActions.DELETE_RECIPE):
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default: state;
  }

}