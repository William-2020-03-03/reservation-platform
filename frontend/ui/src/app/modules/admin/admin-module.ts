import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserListComponent } from '../../components/admin-user-list-component/admin-user-list-component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminUserListComponent,
    title: 'Admin page'
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminModule { }
