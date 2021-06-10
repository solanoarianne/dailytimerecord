import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EventTriggerService } from 'src/app/services/eventTrigger/event-trigger.service';

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
  selector: 'app-stocks-add',
  templateUrl: './stocks-add.component.html',
  styleUrls: ['./stocks-add.component.css']
})

export class StocksAddComponent implements OnInit, AfterViewInit{

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
  closeResult: string;
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

      constructor(private ds: DataService, public router: Router, private et: EventTriggerService) { }
  
        ngOnInit() {

        //mapupunta yung name sa hidden na input sa add
        this.getName();
        //mapupunta yung name sa hidden na input sa edit
        this.getName1();
  }

  pullProducts() {
    this.ds.sendApiRequest("inventory", null).subscribe(data => {
      this.productInfoTable = data.payload;
      console.log(this.productInfoTable);
      this.productInfoTableDataSource.data = this.productInfoTable;
      console.log(this.productInfoTableDataSource);
    })
  }

//CREATE
async addProduct(){
  this.prodInfo.item_name = this.item_name;
  this.prodInfo.item_desc = this.item_desc;
  this.prodInfo.item_quant = this.item_quant;
  this.prodInfo.date_expiry = this.date_expiry;
  this.prodInfo.item_price = this.item_price;
  this.prodInfo.item_minimum = this.item_minimum;
  this.prodInfo.remarks = this.remarks;
  this.prodInfo.modifiedBy = this.modifiedBy;

  console.log(this.prodInfo);
  
  await this.ds.sendApiRequest("addProduct", this.prodInfo).subscribe(res => {
    this.et.sendClickEvent();
  });
}
//EDIT
editForm = (products) => {
  this.prodInfo.item_id    = products.item_id;
  this.prodInfo.item_name = products.item_name;
  this.prodInfo.item_desc = products.item_desc;
  this.prodInfo.item_quant = products.item_quant;
  this.prodInfo.date_expiry = products.date_expiry;
  this.prodInfo.item_price = products.item_price;
  this.prodInfo.item_minimum = products.item_minimum;
  this.prodInfo.remarks1 = products.remarks1;
}
async editProduct(e){
  e.preventDefault();
  this.prodInfo.modifiedBy1 = this.modifiedBy1
  console.log(this.prodInfo.modifiedBy1);
  await this.ds.sendApiRequest("editProduct", this.prodInfo).subscribe(res => {
    this.pullProducts();
  })
}
}