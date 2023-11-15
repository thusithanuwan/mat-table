import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultSet} from "../Model/ResultSet";

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiurl = 'https://localhost:7236/Student';

  constructor(private http:HttpClient) { }

  getStudent(pageNumber: number, pageSize: number, filterValue: string, orderState: string):Observable<ResultSet>{
    return this.http.get<ResultSet>(this.apiurl + "?" + "pageNumber="+pageNumber+"&pageSize="+pageSize+"&filterValue="+filterValue+"&orderState="+orderState);
  }

}
