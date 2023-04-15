import { Component, Input } from '@angular/core';




@Component({
  selector: 'lib-grid',
  templateUrl: './grid.component.html',
  styleUrls: [
  ]
})
export class GridComponent {
  @Input() dataSource:any
  data:any;
  displayedColumns:any = []
  private ngOnInit(): void {
    console.log(this.dataSource)
    this.data = this.dataSource.data
    this.dataSource.column.forEach((col:any) => {
      console.log(col.field)
      this.displayedColumns.push(col.field)
    })
    console.log(this.displayedColumns)
  }
}
