import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  prodInfo: any = {};
  products: any;
  

  //dito ipapasa yung value ng input field kaya mas better kapag same nalng din yung  [(NgModel)] na attribute at var dito sa column name nyo sa db
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
  modifiedBy: any;
  modifiedBy1: any;

  //function to get the name of the user
  getName(){
    this.modifiedBy = localStorage.getItem("Fullname");
    }
  
    getName1(){
      this.modifiedBy1 = localStorage.getItem("Fullname");
      }


  //dito malalagay kung sino yung nag login hehe
  
  

  closeResult: string;


  //Font-awesome Icons NOTE: kaylangan mo munang iimport yung icon 
  //na gagamitin mo then declare mo lang dito kung anong icon yon kagaya netong nasa baba

  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;

  constructor(private ds: DataService, public router: Router, private modalService: NgbModal) { }

  //Modals
  addModal(contentAdd) {
    
    this.modalService.open(contentAdd, { centered: true });

    
  }

  editModal(contentEdit) {
    this.modalService.open(contentEdit, { centered: true }); 
    
  }



  ngOnInit() {

    
    document.getElementById('name').innerHTML = localStorage.getItem("Fullname");
    this.pullProducts();


    //mapupunta yung name sa hidden na input sa add
    this.getName();

    //mapupunta yung name sa hidden na input sa edit
    this.getName1();

  }

  pullProducts() {
    this.ds.sendApiRequest("inventory", null).subscribe(data => {
      this.products = data.data;
    })
    
  }
//CRUD FUNCTIONS

  //DELETE
  async delProduct(e) {
    this.prodInfo.item_id = e;
    await this.ds.sendApiRequest("delProduct", this.prodInfo).subscribe(res => {
      this.pullProducts();
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
    })

  }

  //EDIT

  //get the value of a row
  editForm = (products) => {

    

    this.prodInfo.item_id1    = products.item_id;
    this.prodInfo.item_name1 = products.item_name;
    this.prodInfo.item_desc1 = products.item_desc;
    this.prodInfo.item_quant1 = products.item_quant;
    this.prodInfo.date_expiry1 = products.date_expiry;
    this.prodInfo.item_price1 = products.item_price;
    this.prodInfo.item_minimum1 = products.item_minimum;
    this.prodInfo.remarks1 = products.remarks;

    

      
    
  }

  //EDIT FUNCTION

 
  async editProduct(e){
    e.preventDefault();
    this.prodInfo.modifiedBy1 = this.modifiedBy1
    console.log(this.prodInfo.modifiedBy1);
    await this.ds.sendApiRequest("editProduct", this.prodInfo).subscribe(res => {
      this.pullProducts();
    })
  }

  
logoutFunction(){
  localStorage.clear();
  this.router.navigate(['']);
}

  

}
