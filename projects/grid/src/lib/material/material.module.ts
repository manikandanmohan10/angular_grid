import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

const material = [
    MatTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    material,
  ],
  exports: [
    material,
  ]
})
export class MaterialModule { }
