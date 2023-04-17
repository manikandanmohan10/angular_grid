import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { filter, flatMap } from 'rxjs';


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
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() dataSource:any
  isToggled:boolean = false;
  filterConditions!: FormGroup;
  filterObject!: FormGroup;
  filterJoinList = ['where','and', 'or'];
  filterCoditionList = ['equal', 'not equal', 'like', 'not like', 'in', 'not in']

  data:any;
  displayedColumns:any = []
  constructor(private formBuild:FormBuilder){}
  private ngOnInit(): void {
    this.initializingForm()
    this.data = this.dataSource.data
   }
  sortDir = 1;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort | undefined;
  

  ngAfterViewInit() {
    this.data =  new MatTableDataSource<Element>(this.dataSource.data);
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
    console.log(this.data.paginator)
    this.dataSource.column.forEach((col:any) => {
      this.displayedColumns.push(col.field)
    })
  }
  
  private initializingForm(){
    this.filterConditions = this.formBuild.group({
      filter:this.formBuild.array([this.createArray()])
    })
    
    

  }
  private createArray(){
    return this.formBuild.group({
      filterJoin:'',
      colName:'',
      filterCondition:'',
      colValue:''})
  }
  private filterValuefun(col:any,filter:string,key?:string ):boolean{
    console.log(col,filter,key)
    if (key){
      if(col[key].toString().toLowerCase().includes(filter)){
        return true;
      }
    }
    else{
      let keys = Object.keys(col);
    for(let key of keys){
      console.log(key)
      if(col[key].toString().toLowerCase().includes(filter)){
        return true;
      }
    }
  }
    
    return false
  }
    
  
  public searchValue(value:string): void{
    
    let filterValue = this.data.filter((col:any) => {
      return this.filterValuefun(col,value);
      
    })
    console.log(filterValue)
    this.data = filterValue 
  }
  public toggle(): void{
    console.log('helo')
    this.isToggled = !this.isToggled

  }
  get filter(): FormArray{
    return this.filterConditions.controls['filter'] as FormArray
  }
  public addFilter(): void{
    console.log(this.filterObject)
    const filterArray = this.filterConditions.controls['filter'] as FormArray
    filterArray.push(this.createArray())
    console.log(filterArray)
  }

  public filterTable(): void{
    let filteredObjects:any = []
    console.log('value => ', this.filterConditions.controls['filter'].value)
    const filterArr =this.filterConditions.controls['filter'].value
    filterArr.forEach((filterValue:any) => {
      console.log(filterValue)
      if(filterValue.filterJoin ==='and' || 'where'){
        filteredObjects = this.data.filter((col:any) => {
          return this.queryCondition(filterValue,col)
        })
      }
      else{
        this.dataSource.data.forEach((col:any) => {

        })
      }
      
    })
    console.log(filteredObjects)
    this.data = filteredObjects
  }
  private queryCondition(filterValue:any,data:any):boolean{
    switch (filterValue.filterCondition) {
      case 'equal':
        if(data[filterValue.colName] === filterValue.colValue){
          return true;
        }
        return false;
        case 'not equal':
          if(data[filterValue.colName] !== filterValue.colValue){
            return true;
          }
          return false;
        case 'like':
          return this.filterValuefun(data,filterValue.colValue,filterValue.colName);
        case 'not like':
          console.log("not like => ",filterValue)
          return !this.filterValuefun(data,filterValue.colValue,filterValue.colName);

        // case 'in':
        //   console.log("in => ",filterValue)
  
        //   break;
        // case 'not in':
        //     console.log("not in => ",filterValue)
    
        //     break;
      default:
        return false
        break;
    }
  }
  
}
