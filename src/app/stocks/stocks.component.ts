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
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


export interface StocksTable {
  item_id: number;
  emp_id:number;
  first_name: string;
  item_desc: string;
  last_name: string;
  time_in: number;
  time_out: number;
  date_expiry: string;
  contact_num: string;
  item_minimum: string;
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
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, AfterViewInit {

  
  mt: measurementType[] = [
    {value: 'M', viewValue: 'Male'},
    {value: 'F', viewValue: 'Female'},
    
    
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

  

  @ViewChild('EditDialog', { static: true }) EditDialog: TemplateRef<any>;


  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  
  // displayedColumns: string[] = ['position', 'name', 'description', 'quantity','date_acquired','date_expiry','price','minimum','remarks','date_modified','modified_by','action'];
  // dataSource = ELEMENT_DATA;
  modifiedBy: any;
  modifiedBy1: any;

  prodInfo: any = {};
  products: any;

  item_id: any;
  emp_id: any;
  first_name: string;
  item_desc: any;
  last_name: string;
  time_in: number;
  time_out: number;
  date_expiry: any;
  contact_num: string;
  item_minimum: string;
  remarks: any;
  username: string
  username1: string
  measurementType: any;
  item_id1: any;
  emp_id1: any;
  first_name1: string;
  item_desc1: any;
  last_name1: string;
  time_in1: number;
  time_out1: number;
  date_expiry1: any;
  contact_num1: string;
  item_minimum1: string;
  remarks1: any;
  measurementType1: any;

  clickEvent: Subscription;


  archiveCounter = 0;

  constructor(private fb: FormBuilder, private et: EventTriggerService,public dialog: MatDialog, private ds: DataService) {

    this.clickEvent = this.et.getClickEvent().subscribe(()=> {
      this.pullProducts();

      this.archiveCount();
    });

  }

  productForm = this.fb.group({
    item_id:['',Validators.required],
    emp_id:['',Validators.required],
    first_name:['',Validators.required],
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



   
  editModal = (i) => {
    
    this.dialog.open(this.EditDialog);

    this.productForm.patchValue({
      item_id: i.item_id,
      emp_id: i.emp_id,
      first_name: i.first_name,
      item_desc: i.item_desc,
      last_name: i.last_name,
      time_in: i.time_in,
      time_out: i.time_out,
      contact_num: i.contact_num,
      item_minimum: i.item_minimum,
      remarks: i.remarks,
      date_expiry: i.date_expiry,
      measurementType: i.measurementType
    })
  }


  

  editStocks(): void {
    this.dialog.open(EditStockComponent, {
      data: {
        item_id: this.item_id, 
        full_name: this.first_name
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
    this.productInfoTableDataSource.data = this.productInfoTable;
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

  Swal.fire({
    title: 'Are you sure you want to archive this file?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, archive it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Recovered!',
        'Your file has been archived.',
        'success'
      )

      this.prodInfo.item_id = e;
      console.log(this.prodInfo);
        this.ds.sendApiRequest("arcProduct", this.prodInfo).subscribe(res => {
        this.pullProducts();
        this.archiveCount();
    });
 
    }
  });
 
}
//RECOVER Item
async recProduct(e) {
  this.prodInfo.item_id = e;
  await this.ds.sendApiRequest("recProduct", this.prodInfo).subscribe(res => {
    this.pullArchive();
});
}


// EDIT
editProduct(e){
  e.preventDefault();

  if(!this.productForm.valid)
  {
    Swal.fire({
      icon: 'error',
      title: 'All fields are required',
      showConfirmButton: false,
      timer: 1200
    });

    return false;
  } 
  
  else
  {
    this.prodInfo.first_name = this.productForm.value['first_name'];
    this.prodInfo.item_id =   this.productForm.value['item_id'];
    this.prodInfo.emp_id =   this.productForm.value['emp_id'];
    this.prodInfo.item_desc = this.productForm.value['item_desc'];
    this.prodInfo.last_name =  this.productForm.value['last_name'];
    this.prodInfo.time_in =  this.productForm.value['time_in'];
    this.prodInfo.time_out =  this.productForm.value['time_out'];
    this.prodInfo.item_minimum =  this.productForm.value['item_minimum'];
    this.prodInfo.contact_num =  this.productForm.value['contact_num'];
    this.prodInfo.remarks = this.productForm.value['remarks'];
    this.prodInfo.date_expiry = this.productForm.value['date_expiry'];
    this.prodInfo.modifiedBy = this.modifiedBy;
    this.prodInfo.measurementType = this.productForm.value['measurementType'];
  
  this.ds.sendApiRequest("editProduct", this.prodInfo).subscribe(data => {
  this.pullProducts();
    });
  
    Swal.fire({
      icon: 'success',
      title: 'Employee Edited',
      showConfirmButton: false,
      timer: 1200
    });
  
  }
 


}

}


// const ELEMENT_DATA: StocksTable[] = [
//   {position: 1, name: 'Adobong Burat', description: 'Masarap', quantity: 1, date_acquired: '20-05-2021', date_expiry: '23-05-2021', price: 150, minimum: 1, remakrs: '', date_modified: '20-05-21', modified_by: 'Euriel John'},
// ];

