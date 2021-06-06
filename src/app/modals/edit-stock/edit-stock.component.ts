import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.css']
})
export class EditStockComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditStockComponent>
  ) { }

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
  ngOnInit(): void {
  }

}
