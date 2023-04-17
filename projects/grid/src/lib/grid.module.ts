import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridComponent } from './grid.component';
import { MaterialModule } from './material/material.module';




@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    GridComponent,
    MaterialModule
  ]
})
export class GridModule { }
