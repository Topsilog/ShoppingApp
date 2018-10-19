import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription, iif } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions'; // import the shopping list action
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef
  // @ViewChild('amountInput') amountInputRef: ElementRef
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  numberPatternValidator: any = "^[1-9]+[0-9]*$";
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('shoppingAddForm') slForm: NgForm; //access form 

  constructor(private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState> // this will also work: Store<any>
    ) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    // const constIngredientName = this.nameInputRef.nativeElement.value;
    // const constIngredientAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, newIngredient: newIngredient}));
    } else {
      // this.slService.postIngredients(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient)); // create new instance for Action Class imported/exported
    }

    // reset form
    // this.editMode = false;
    // this.slForm.reset();
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
    // this.slService.deleteIngredient(this.editedItemIndex);
  }
}
