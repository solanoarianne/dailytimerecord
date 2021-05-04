import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [

  {path: 'main', component: MainComponent},
  {path: '', component: LoginComponent}

]


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
