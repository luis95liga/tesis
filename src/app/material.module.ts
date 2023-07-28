import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from '@angular/material/radio';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

const myModules = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  ScrollingModule,
  FontAwesomeModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatTabsModule,
  MatTreeModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  FlexLayoutModule,
  AgmCoreModule,
  MatRadioModule,
  MatBottomSheetModule,
];

@NgModule({
  imports: [...myModules],
  exports: [...myModules],
})
export class MaterialModule { }
