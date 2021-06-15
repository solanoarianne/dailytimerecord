import { AfterViewInit, Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StocksAddComponent} from './stocks-add/stocks-add.component';

import { DataService } from 'src/app/services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {MatSort} from '@angular/material/sort';
import { ArchiveComponent } from '../archive/archive.component';
import { EventTriggerService } from '../services/eventTrigger/event-trigger.service';
import { Subscription } from 'rxjs';
import { EditStockComponent } from '../modals/edit-stock/edit-stock.component';



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

  
  @ViewChild('EditDialog', { static: true }) EditDialog: TemplateRef<any>;

  editModal = (i) => {
    this.dialog.open(this.EditDialog);
    this.item_name1 = i.item_name;
    this.item_id1 = i.item_id;
    this.item_desc1 = i.item_desc;
    this.item_quant1 = i.item_quant;
    this.item_price1 = i.item_price;
    this.item_minimum1 = i.item_minimum;
    this.remarks1 = i.remarks;
    this.date_expiry1 = i.date_expiry;


   

    console.log(this.prodInfo);

  }




  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  productInfoTable: StocksTable[]  = [];
  productInfoTableDataSource = new MatTableDataSource(this.productInfoTable);
  displayedColumns: string[] = [

    "statusCol",
    "Column1",
    "Column2",
    "Column3",
    "Column4",
    "Column5",
    "Column6",
    "Column7",
    "Column8",
    "Column9",
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

  item_id1: any;
  item_name1: any;
  item_desc1: any;
  item_quant1: any;
  date_expiry1: any;
  item_price1: any;
  item_minimum1: any;
  remarks1: any;

  clickEvent: Subscription;


  archiveCounter = 0;

  constructor(private et: EventTriggerService,public dialog: MatDialog, private ds: DataService) {


    this.clickEvent = this.et.getClickEvent().subscribe(()=> {
      this.pullProducts();

      this.archiveCount();
    })


  }


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(StocksAddComponent, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });
  // }
  

  editStocks(): void {
    this.dialog.open(EditStockComponent, {
      data: {
        item_id: this.item_id, 
        item_name: this.item_name
            }
    });
  }
  
  addStocks() {
    this.dialog.open(StocksAddComponent);
  }

  addArchive() {
    this.dialog.open(ArchiveComponent, {
      height: '800px',
      width: '15000px',
    });
  }



  getName(){
    this.modifiedBy = localStorage.getItem("Fullname");
    }
  
    getName1(){
      this.modifiedBy1 = localStorage.getItem("Fullname");
      }


      ngAfterViewInit() {
        this.productInfoTableDataSource.paginator = this.paginator;


       
      }

      ngOnInit() {

        this.archiveCount();
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
  


  public doFilter = (value: string) => {
    this.productInfoTableDataSource.filter = value.trim().toLocaleLowerCase();
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
pullArchive() {
  this.ds.sendApiRequest("inventory_Archive", null).subscribe(data => {
    this.productInfoTable = data.payload;
    console.log(this.productInfoTable);
    this.productInfoTableDataSource.data = this.productInfoTable;
    console.log(this.productInfoTableDataSource);
  })
}


archiveCount() {
  this.ds.sendApiRequest("inventory_Archive", null).subscribe(data => {
    this.productInfoTable = data.payload;
    var count = Object.keys(data.payload).length;
    this.archiveCounter = count;
  })
}

//CRUD FUNCTIONS



//ARCHIVE Item
async arcProduct(e) {
  this.prodInfo.item_id = e;
  console.log(this.prodInfo);
  await this.ds.sendApiRequest("arcProduct", this.prodInfo).subscribe(res => {
    this.pullProducts();
    this.archiveCount();
});
}
//RECOVER Item
async recProduct(e) {
  this.prodInfo.item_id = e;
  await this.ds.sendApiRequest("recProduct", this.prodInfo).subscribe(res => {
    this.pullArchive();
});
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

  console.log(this.prodInfo.modifiedBy);
  
  await this.ds.sendApiRequest("addProduct", this.prodInfo).subscribe(res => {
    this.pullProducts();
  });
}

// EDIT
editProduct(e){
  e.preventDefault();

  this.prodInfo.item_name = this.item_name1;
  this.prodInfo.item_id = this.item_id1;
  this.prodInfo.item_desc = this.item_desc1;
  this.prodInfo.item_quant = this.item_quant1;
  this.prodInfo.item_minimum = this.item_minimum1;
  this.prodInfo.item_price = this.item_price1;
  this.prodInfo.remarks = this.remarks1;
  this.prodInfo.date_expiry = this.date_expiry1;

  this.prodInfo.modifiedBy = this.modifiedBy;


  console.log(this.prodInfo);

this.ds.sendApiRequest("editProduct", this.prodInfo).subscribe(data => {

this.pullProducts();
  });

}

}


// const ELEMENT_DATA: StocksTable[] = [
//   {position: 1, name: 'Adobong Burat', description: 'Masarap', quantity: 1, date_acquired: '20-05-2021', date_expiry: '23-05-2021', price: 150, minimum: 1, remakrs: '', date_modified: '20-05-21', modified_by: 'Euriel John'},
// ];

