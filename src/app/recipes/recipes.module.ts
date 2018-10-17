import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common"; // should be added on feature module, gives access to common directives like ngfor, ngif, etc..

import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesItemsComponent } from "./recipes-list/recipes-items/recipes-items.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeStartComponent,
    RecipesListComponent,
    RecipeEditComponent,
    RecipesDetailComponent,
    RecipesItemsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,    
    RecipesRoutingModule,
    SharedModule
  ]
})
export class RecipesModule {}