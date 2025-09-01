import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from '../../components/admin-dashboard-component/admin-dashboard-component';
import { ManageReservationsComponent } from '../../components/manage-reservations-component/manage-reservations-component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    title: 'Admin page'
  },
  {
    path: 'managereservations',
    component: ManageReservationsComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminModule { }
