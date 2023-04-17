import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

export interface Element {
  name: string,
  phone: string,
  email: string,
  address: string,
  postalZip: string,
  region: string,
  country: string,
  list: number,
  text: string,
  numberrange: number,
  currency: string,
  alphanumeric: string,
  date: string,
  constant: number,
  company: string,
  boolean: false,
  list1: string,
  guid: string,
  cvv: number,
  track2: string,
}

@Component({
  selector: 'lib-grid',
  templateUrl: './grid.component.html',
  styleUrls: [
  ]
})
export class GridComponent {
  sortDir = 1;
  @Input() dataSource:any =[]
  data:any
  displayedColumns:any = []
  constructor(){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit(): void {
  }
  

  ngAfterViewInit() {
    this.data =  new MatTableDataSource<Element>(this.dataSource.data);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    console.log(this.data.paginator)
    this.dataSource.column.forEach((col:any) => {
      console.log(col.field)
      this.displayedColumns.push(col.field)
    })
  }
  
}
