import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StocksAddComponent} from './stocks-add/stocks-add.component';

export interface StocksTable {
  position: number;
  name: string;
  description: string;
  quantity: number;
  date_acquired: string;
  date_expiry: string;
  price: number;
  minimum: number;
  remakrs: string;
  date_modified: string;
  modified_by: string;

  
}


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  router: any;
  displayedColumns: string[] = ['position', 'name', 'description', 'quantity','date_acquired','date_expiry','price','minimum','remarks','date_modified','modified_by','action'];
  dataSource = ELEMENT_DATA;
  modifiedBy: any;
  modifiedBy1: any;


  constructor(public dialog: MatDialog) {}

  addStocks() {
    this.dialog.open(StocksAddComponent);
  }
  getName(){
    this.modifiedBy = localStorage.getItem("Fullname");
    }
  
    getName1(){
      this.modifiedBy1 = localStorage.getItem("Fullname");
      }


      ngOnInit() {

    
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

}

const ELEMENT_DATA: StocksTable[] = [
  {position: 1, name: 'Adobong Burat', description: 'Masarap', quantity: 1, date_acquired: '20-05-2021', date_expiry: '23-05-2021', price: 150, minimum: 1, remakrs: '', date_modified: '20-05-21', modified_by: 'Euriel John'},

  
];

