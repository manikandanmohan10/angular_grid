import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridComponent } from './grid.component';
import { MaterialModule } from './material/material.module';




@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    GridComponent,
    MaterialModule
  ]
})
export class GridModule { }
