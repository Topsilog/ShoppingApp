import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipes-items',
  templateUrl: './recipes-items.component.html',
  styleUrls: ['./recipes-items.component.scss']
})
export class RecipesItemsComponent implements OnInit {
  // @Input() recipeitem_obj: {name: string, desc: string, imagePath: string};
  @Input() recipeitem_obj: Recipe;
  // @Output() recipeItemSelected = new EventEmitter<Recipe>();
  @Input() index: number;

  ngOnInit() {
  }

}
