import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

export interface StocksTable {
  item_id: number;
  full_name: string;
  item_desc: string;
  emp_dept: string;
  date_expiry: string;
  item_price: number;
  item_minimum: number;
  remarks: string;
}
@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {

  // constructor(
  //   @Inject(MAT_DIALOG_DATA) public data: any,
  //   public dialogRef: MatDialogRef<EditStockComponent>
  // ) { }
  modifiedBy: any;
  modifiedBy1: any;

  prodInfo: any = {};
  products: any;

  item_id: any;
  full_name: any;
  item_desc: any;
  emp_dept: any;
  date_expiry: any;
  item_price: any;
  item_minimum: any;
  remarks: any;
  username: string
  username1: string
  productInfoTable: StocksTable[]  = [];
  productInfoTableDataSource = new MatTableDataSource(this.productInfoTable);

  getName(){
    this.modifiedBy = localStorage.getItem("Fullname");
    }
  
    getName1(){
      this.modifiedBy1 = localStorage.getItem("Fullname");
      }

      constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ds: DataService, public dialogRef: MatDialogRef<EditStockComponent>) { }

  ngOnInit(): void {
    document.getElementById('name').innerHTML = localStorage.getItem("Fullname");
    this.pullProducts();


    //mapupunta yung name sa hidden na input sa add
    this.getName();

    //mapupunta yung name sa hidden na input sa edit
    this.getName1();
  }

  public doFilter = (value: string) => {
    this.productInfoTableDataSource.filter = value.trim().toLocaleLowerCase();
  }
  
  pullProducts() {
    this.ds.sendApiRequest("inventory", null).subscribe(data => {
      this.productInfoTable = data.payload;
      console.log(this.productInfoTable);
      this.productInfoTableDataSource.data = this.productInfoTable;
      console.log(this.productInfoTableDataSource);
    })
  }
  editForm = (products) => {
    this.prodInfo.item_id    = products.item_id;
    this.prodInfo.full_name = products.full_name;
    this.prodInfo.item_desc = products.item_desc;
    this.prodInfo.emp_dept = products.emp_dept;
    this.prodInfo.date_expiry = products.date_expiry;
    this.prodInfo.item_price = products.item_price;
    this.prodInfo.item_minimum = products.item_minimum;
    this.prodInfo.remarks = products.remarks;
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
