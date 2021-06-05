import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StocksAddComponent} from './stocks-add/stocks-add.component';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {MatSort} from '@angular/material/sort';

export interface StocksTable {
  item_id: number;
  item_name: string;
  item_desc: string;
  item_quant: number;
  date_expiry: string;
  item_price: number;
  item_minimum: number;
  remarks: string;

  
}




@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, AfterViewInit {

  
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  productInfoTable: StocksTable[]  = [];
  productInfoTableDataSource = new MatTableDataSource(this.productInfoTable);
  displayedColumns: string[] = [

    "Column1",
    "Column2",
    "Column3",
    "Column4",
    "Column5",
    "Column6",
    "Column7",
    "Column8",
    "ActionColumn",
  
  ];

  router: any;
  
  // displayedColumns: string[] = ['position', 'name', 'description', 'quantity','date_acquired','date_expiry','price','minimum','remarks','date_modified','modified_by','action'];
  // dataSource = ELEMENT_DATA;
  modifiedBy: any;
  modifiedBy1: any;

  prodInfo: any = {};
  products: any;

  item_id: any;
  item_name: any;
  item_desc: any;
  item_quant: any;
  date_expiry: any;
  item_price: any;
  item_minimum: any;
  remarks: any;
  username: string
  username1: string



  constructor(public dialog: MatDialog, private ds: DataService, private modalService: NgbModal) {}

  addStocks() {
    this.dialog.open(StocksAddComponent);
  }
  getName(){
    this.modifiedBy = localStorage.getItem("Fullname");
    }
  
    getName1(){
      this.modifiedBy1 = localStorage.getItem("Fullname");
      }


      ngAfterViewInit() {
        this.productInfoTableDataSource.paginator = this.paginator;
        this.productInfoTableDataSource.sort = this.sort;

       
      }

      ngOnInit() {

    
        this.pullProducts();


    
        document.getElementById('name').innerHTML = localStorage.getItem("Fullname");
       // this.pullProducts();
    
    
        //mapupunta yung name sa hidden na input sa add
        this.getName();
    
        //mapupunta yung name sa hidden na input sa edit
        this.getName1();
    
      }
  
  logoutFunction(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  



// TABLE POPULATE

//WHERE is_Archive = 0
pullProducts() {
  this.ds.sendApiRequest("inventory", null).subscribe(data => {
    this.productInfoTable = data.payload;
    console.log(this.productInfoTable);
    this.productInfoTableDataSource.data = this.productInfoTable;
    console.log(this.productInfoTableDataSource);
  })
}






//ARCHIVE Item
async arcProduct(e) {
  this.prodInfo.item_id = e;
  console.log(this.prodInfo);
  await this.ds.sendApiRequest("arcProduct", this.prodInfo).subscribe(res => {
    this.pullProducts();
});
}


}


// const ELEMENT_DATA: StocksTable[] = [
//   {position: 1, name: 'Adobong Burat', description: 'Masarap', quantity: 1, date_acquired: '20-05-2021', date_expiry: '23-05-2021', price: 150, minimum: 1, remakrs: '', date_modified: '20-05-21', modified_by: 'Euriel John'},

  
// ];

