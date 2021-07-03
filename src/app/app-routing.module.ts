import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { StocksComponent } from './stocks/stocks.component';
import { SupplyComponent } from './supply/supply.component';
import { Routes, RouterModule } from '@angular/router';
import { ItemHistoryComponent } from './components/item-history/item-history.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { UsersideComponent } from './userside/userside.component';


const routes: Routes = [
  
  {
    path: 'main', 
    component: MainComponent,
  },
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'orders', 
    component: OrdersComponent,
  },
  {
    path: 'stocks', 
    component: StocksComponent,
  },
  {
    path: 'supply', 
    component: SupplyComponent,
  },
  {
    path: 'itemHistory',
    component: ItemHistoryComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  },
  {
    path: 'userside',
    component: UsersideComponent
  }
  ,{ 
    path: '',   
    redirectTo: '/login', 
    pathMatch: 'full' 
  }

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
