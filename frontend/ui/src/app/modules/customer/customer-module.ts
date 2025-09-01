import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


export const customerRoutes: Routes = [
  {
    path: '',
    // component: ReservationForm,
    title: 'Customer reservation'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes)
  ]
})
export class CustomerModule { }
