import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';


export interface StocksTable {
  item_id: number;
  emp_id:number;
  first_name: string;
  item_desc: string;
  last_name: string;
  date_expiry: string;
  contact_num: string;
  item_minimum: string;
  remarks: string;

  
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  productInfoTable: StocksTable[]  = [];
  productInfoTableDataSource = new MatTableDataSource(this.productInfoTable);
  displayedColumns: any[] = [

    
    "Column1",
    "Column2",
    "Column3",
    "Column4",
    "Column5",
    "Column6",
    "Column7",
    "Column8",
    "Column9",
    "Column10",
    "ActionColumn",
  
  ];

  router: any;
  prodInfo: any = {};
  products: any;
  
  logoutFunction(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  


  public doFilter = (value: string) => {
    this.productInfoTableDataSource.filter = value.trim().toLocaleLowerCase();
  }
}
