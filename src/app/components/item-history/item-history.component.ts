import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import {default as _rollupMoment, Moment} from 'moment';

// const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




interface month {
  value: string;
  viewValue: string;
}

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
  styleUrls: ['./item-history.component.css']
})
export class ItemHistoryComponent implements OnInit {

  selectedMonth: any;
  selectedYear: any = [];

  selectedFilter: any = {};
  selected: any;

  months: month[] = [
    {value: 'All', viewValue: 'All'},
    {value: 'January', viewValue: 'January'},
    {value: 'February', viewValue: 'February'},
    {value: 'March', viewValue: 'March'},
    {value: 'April', viewValue: 'April'},
    {value: 'May', viewValue: 'May'},
    {value: 'June', viewValue: 'June'},
    {value: 'July', viewValue: 'July'},
    {value: 'August', viewValue: 'August'},
    {value: 'September', viewValue: 'September'},
    {value: 'October', viewValue: 'October'},
    {value: 'November', viewValue: 'November'},
    {value: 'December', viewValue: 'December'}
  ];

  favoriteSeason: string;
  filterBy: string[] = ['All', 'Specific Month And Year'];

  constructor(private ds: DataService) { }

  ngOnInit(): void {

    this.monthSelected();
  }


  monthSelected(){

    // SELECT BY MONTH AND YEAR
    // if(this.selectedYear.length == 4 && this.selectedMonth != null){
    //   console.log("SELECT BY MONTH AND YEAR");
    //   this.selectedFilter.selectedYear = this.selectedYear;
    //   this.selectedFilter.selectedMonth = this.selectedMonth;
    //     this.ds.sendApiRequest("selectMY", this.selectedFilter).subscribe(data => {
    //       this.selected = data.data;
    //   });
    // }
    

    // SELECT ONLY BY MONTH
    // else if(this.selectedMonth != null || this.selectedMonth != "All" && this.selectedYear == null){

    //   if (this.selectedMonth === "All")
    //   {
    //  SELECT ALL
      //   this.selectedYear = null;
      //   console.log("ALL YEAH")
      //   this.ds.sendApiRequest("inventory", null).subscribe(data => {
      //     this.selected = data.data;
      //   });
      // }
      // else
      
      // {
      //   console.log("SELECT BY MONTH");
      //   this.selectedFilter.selectedMonth = this.selectedMonth;
      //   this.ds.sendApiRequest("selectM", this.selectedFilter).subscribe(data => {
      //     this.selected = data.data;
      // });

      // }
      
      
  //   }

  //   // SELECT ONLY BY YEAR
  //   else if(this.selectedYear.length == 4 && this.monthSelected == null){
  //     console.log("SELECT BY YEAR");
  //   }

  //   // SELECT ALL
  //   else if (this.selectedMonth == "" || this.selectedMonth == null)
  //   {

  //     console.log("HELLO");
  //     this.ds.sendApiRequest("inventory", null).subscribe(data => {
  //       this.selected = data.data;
  //     });

  //   }
   
  // }

  if(this.selectedMonth === "All"){
    this.ds.sendApiRequest("inventory", null).subscribe(data => {
      this.selected = data.data;
 });

  }

  }
}
