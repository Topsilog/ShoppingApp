import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs'; // Subscription removed REDUX implementation
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredient[];
  shoppingListState: Observable<{ingredients: Ingredient[]}>
  
  // private subscription: Subscription; // commented REDUX implementation

  constructor(private shoppingListService: ShoppingListService, 
    // access the global state declared from app.module(forRoot)
    private store: Store<{ 
      shoppingList: {
        ingredients: Ingredient[]
      }
    }>
  ) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');

    // commented out due to REDUX Action implementation
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients
    //   }
    // )
  }

  // commented due to REDUX implementation
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}
