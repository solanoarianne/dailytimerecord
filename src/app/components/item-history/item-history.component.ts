import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl, FormBuilder, FormGroup} from '@angular/forms';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM/YYYY',
  },
  display: {
    dateInput: 'MMMM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};



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
  selector: 'app-item-history',
  templateUrl: './item-history.component.html',
  styleUrls: ['./item-history.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ItemHistoryComponent implements OnInit, AfterViewInit {



  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  productInfoTable: StocksTable []  = [];
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
 
  
  ];







  selectedMonth: string = 'All';
  selectedYear: any = [];

  selectedFilter: any = {};
  selected: any;
  selectedMY: any;

  initYear: any;
  initMonth: any;

  selectedMYBool = false;

  


  filterBy: string[] = ['All', 'Specific Month And Year'];

  constructor(private ds: DataService) { }

  ngOnInit(): void {

    this.monthSelected();
  }


  ngAfterViewInit() {
    this.productInfoTableDataSource.paginator = this.paginator;
    this.productInfoTableDataSource.sort = this.sort;
  }




  datePicker = new FormGroup({
    date1: new FormControl()
 });



//  DATE PICKER PROPERTIES

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    this.selectedFilter.selectedYear = normalizedYear.year();
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

   
    
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    
    this.selectedFilter.selectedMonth= normalizedMonth.month() + 1;
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    
    this.date.setValue(ctrlValue);
    datepicker.close();

  }


// MAIN FUNCTION
  monthSelected(){

    var count = Object.keys(this.selectedFilter).length;
    console.log(count);

 
     


  if(this.selectedMonth === "All"){
    this.datePicker.controls['date1'].disable();
    console.log(this.selectedMonth);
    this.ds.sendApiRequest("inventory", null).subscribe(data => {
      this.selected = data.data;
      this.productInfoTable = data.payload;
      this.productInfoTableDataSource = data.payload;
      
    
 });

   
  }

  else if (this.selectedMonth === "Specific Month And Year"){
    this.datePicker.controls['date1'].enable();
    if(count == 2){
      console.log("you can send spi request now");
      this.ds.sendApiRequest("selectMY", this.selectedFilter).subscribe(data => {
        this.productInfoTable = data.payload;
      this.productInfoTableDataSource = data.payload;
       
   });
    }   
  }

    }

  
  }

