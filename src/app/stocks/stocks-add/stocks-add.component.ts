import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { EventTriggerService } from 'src/app/services/eventTrigger/event-trigger.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NumberLiteralType } from 'typescript';



export interface StocksTable {
  item_id: number;
  emp_id: number;
  first_name: string;
  item_desc: string;
  last_name: string;
  date_expiry: string;
  contact_num: string;
  item_minimum: string;
  time_in: string;
  time_out: string;
  remarks: string;
}


interface measurementType {
  value: string;
  viewValue: string;
}

interface time_in {
  value: string;
  viewValue: string;
}

interface time_out {
  value: string;
  viewValue: string;
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

  
  mt: measurementType[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
 
    
    
  ];

  ti: time_in[] = [
    {value: '00:00', viewValue: '00:00'},
    {value: '01:00', viewValue: '01:00'},
    {value: '02:00', viewValue: '02:00'},
    {value: '03:00', viewValue: '03:00'},
    {value: '04:00', viewValue: '04:00'},
    {value: '05:00', viewValue: '05:00'},
    {value: '06:00', viewValue: '06:00'},
    {value: '07:00', viewValue: '07:00'},
    {value: '08:00', viewValue: '08:00'},
    {value: '09:00', viewValue: '09:00'},
    {value: '10:00', viewValue: '10:00'},
    {value: '11:00', viewValue: '11:00'},
    {value: '12:00', viewValue: '12:00'},
    {value: '13:00', viewValue: '13:00'},
    {value: '14:00', viewValue: '14:00'},
    {value: '15:00', viewValue: '15:00'},
    {value: '16:00', viewValue: '16:00'},
    {value: '17:00', viewValue: '17:00'},
    {value: '18:00', viewValue: '18:00'},
    {value: '19:00', viewValue: '19:00'},
    {value: '20:00', viewValue: '20:00'},
    {value: '21:00', viewValue: '21:00'},
    {value: '22:00', viewValue: '22:00'},
    {value: '23:00', viewValue: '23:00'},
 
    
    
  ];

  to: time_out[] = [
    {value: '00:00', viewValue: '00:00'},
    {value: '01:00', viewValue: '01:00'},
    {value: '02:00', viewValue: '02:00'},
    {value: '03:00', viewValue: '03:00'},
    {value: '04:00', viewValue: '04:00'},
    {value: '05:00', viewValue: '05:00'},
    {value: '06:00', viewValue: '06:00'},
    {value: '07:00', viewValue: '07:00'},
    {value: '08:00', viewValue: '08:00'},
    {value: '09:00', viewValue: '09:00'},
    {value: '10:00', viewValue: '10:00'},
    {value: '11:00', viewValue: '11:00'},
    {value: '12:00', viewValue: '12:00'},
    {value: '13:00', viewValue: '13:00'},
    {value: '14:00', viewValue: '14:00'},
    {value: '15:00', viewValue: '15:00'},
    {value: '16:00', viewValue: '16:00'},
    {value: '17:00', viewValue: '17:00'},
    {value: '18:00', viewValue: '18:00'},
    {value: '19:00', viewValue: '19:00'},
    {value: '20:00', viewValue: '20:00'},
    {value: '21:00', viewValue: '21:00'},
    {value: '22:00', viewValue: '22:00'},
    {value: '23:00', viewValue: '23:00'},
 
    
    
  ];


  modifiedBy: any;
  modifiedBy1: any;

  prodInfo: any = {};
  products: any;

  item_id: any;
  emp_id: number;
  first_name: any;
  item_desc: any;
  last_name: any;
  time_in: string;
  time_out: string;
  date_expiry: any;
  contact_num: string;
  item_minimum: string;
  measurementType: any;
  remarks: any;
  username: string
  username1: string
  closeResult: string;
  notificationService: any;


  isSubmitted = false;


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

      constructor( private ds: DataService, public router: Router, private et: EventTriggerService,private fb: FormBuilder, private dialogRef: MatDialogRef<StocksAddComponent>) { }




      productForm = this.fb.group({
        first_name:['',Validators.required],
        emp_id:['',Validators.required],
        item_desc:['',Validators.required],
        last_name:['',Validators.required],
        time_in:['',Validators.required],
        time_out:['',Validators.required],
        date_expiry:['',Validators.required],
        contact_num:['',Validators.required],
        item_minimum:['',Validators.required],
        measurementType:['',Validators.required],
        remarks:['',Validators.required]
       });
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
  //binago ko saglit yung SUBMIT sa Add button pwede to tanggalin tas ipalit yung addproduct()
onSubmit() {
  console.log(this.productForm);
}

//CREATE
addProduct(){

  this.isSubmitted = true;

  if(!this.productForm.valid)
  {
    return false;
  } 
  
  else
  {
    this.prodInfo.first_name = this.productForm.value['first_name'];
    this.prodInfo.emp_id = this.productForm.value['emp_id'];
    this.prodInfo.item_desc = this.productForm.value['item_desc'];
    this.prodInfo.last_name = this.productForm.value['last_name'];
    this.prodInfo.date_expiry = this.productForm.value['date_expiry'];
    this.prodInfo.contact_num = this.productForm.value['contact_num'];
    this.prodInfo.item_minimum = this.productForm.value['item_minimum'];
    this.prodInfo.time_in = this.productForm.value['time_in'];
    this.prodInfo.time_out = this.productForm.value['time_out'];
    this.prodInfo.remarks = this.productForm.value['remarks'];
    this.prodInfo.modifiedBy = localStorage.getItem('Fullname');
    this.prodInfo.measurementType = this.productForm.value['measurementType'];

    
    this.ds.sendApiRequest("addProduct", this.prodInfo).subscribe(res => {
    this.et.sendClickEvent();
    });

    Swal.fire({
      icon: 'success',
      title: 'Employee Added',
      showConfirmButton: false,
      timer: 1200
    })
    this.dialogRef.close();
  }

  
}
//EDIT
editForm = (products) => {
  this.prodInfo.item_id    = products.item_id;
  this.prodInfo.emp_id    = products.emp_id;
  this.prodInfo.first_name = products.first_name;
  this.prodInfo.item_desc = products.item_desc;
  this.prodInfo.last_name = products.last_name;
  this.prodInfo.time_in = products.time_in;
  this.prodInfo.time_out = products.time_out;
  this.prodInfo.date_expiry = products.date_expiry;
  this.prodInfo.contact_num = products.contact_num;
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