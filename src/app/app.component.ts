import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MasterService} from "./service/master.service";
import {ResultSet, Student} from "./Model/ResultSet";
import {MatPaginator} from "@angular/material/paginator";
import {fadeInLegacyItems} from "@angular/material/legacy-menu";
import {catchError, map, startWith, switchMap} from "rxjs";
import { merge, Observable, of as observableOf, pipe } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'email'];
  // dataSource:any;

  dataSource = new MatTableDataSource<ResultSet>();

  // Filter and OrderState
  filterValue:any;
  selectedOrderStatus: any = 1;

  // Student Array
  emptyData:any;

  // Total Result
  totalElement:any;

  //1. Link paginator with our table
  // @ViewChild(MatPaginator) paginator !:MatPaginator;

  @ViewChild('paginator') paginator!: MatPaginator;





  constructor(private service:MasterService) {
  }

  // getAll(pageNumber: number, pageSize: number){
  //   this.service.getStudent(pageNumber, pageSize).subscribe(result => {
  //     this.emptyData=result.list;
  //     this.totalResult = result.totalResult;
  //     // alert(result.totalResult)
  //
  //     //2. Link paginator with our table
  //     this.dataSource=new MatTableDataSource(this.emptyData)
  //     this.dataSource.paginator=this.paginator;
  //   });
  // }

  ngOnInit() {
    // this.getAll();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.service.getStudent(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
            this.filterValue,
            this.selectedOrderStatus
          ).pipe(catchError(() => observableOf(null)));
        }),
        map((resultSet) => {
          if (resultSet == null) {
            this.totalElement=0;
            return []
          };
          this.totalElement = resultSet.totalResult;
          return resultSet.list;
        })
      )
      .subscribe((resultSet) => {
        this.emptyData = resultSet;
        this.dataSource = new MatTableDataSource(this.emptyData);
      });
  }









  applyFilter($event: KeyboardEvent) {
    // @ts-ignore
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    this.ngAfterViewInit();
  }

  getAllMixinOrdersForOfficeAndState(orderState: any) {
    this.selectedOrderStatus = orderState;
    this.ngAfterViewInit();
  }

}
