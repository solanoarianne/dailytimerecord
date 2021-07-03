import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditStockComponent } from 'src/app/modals/edit-stock/edit-stock.component';



@Injectable()

export class EditServiceService {

  item_id: number;
    full_name: string;
    item_desc: string;
    emp_dept: string;
    date_expiry: string;
    item_price: number;
    item_minimum: number;
    remarks: string;


  constructor(public dialog: MatDialog) { }


  openDialog(): Observable<any> {
    const dialogRef = this.dialog.open(EditStockComponent, {
      data: { 
        item_id: this.item_id, 
        full_name: this.full_name,
        item_desc: this.item_desc,
        emp_dept: this.emp_dept,
        item_price: this.item_price,
        item_minimum: this.item_minimum,
        date_expiry: this.date_expiry,
        remarks: this.remarks,
        typeD: 'error',
        content: `<ng-container *ngFor="let x of data.status.message"><label [innerHtml]="x"></label>
                          </ng-container>` }
    });

    return dialogRef.afterClosed();
  }

}
