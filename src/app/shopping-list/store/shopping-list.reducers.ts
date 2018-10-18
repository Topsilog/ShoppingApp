// Reducer's role is to update the state, not actually update but creating a new state
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initState = {
  ingredients: [
    new Ingredient('Cactus', 12),
    new Ingredient('Breads', 22)
  ]
}

export function shoppingListReducer(state = initState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      }
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updateIngredient = {
        ...ingredient,
        ...action.payload.newIngredient
      };
      const ingredients = [...state.ingredients];
      ingredients[action.payload.index] = updateIngredient;
      return {
        ...state,
        ingredients: ingredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
       const oldIngredients = [...state.ingredients];
       oldIngredients.splice(action.payload, 1);
       return {
         ...state,
         ingredients: oldIngredients
       };
    default:
      return state;
  }
}