import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AdminService, RegisterUser } from '../../services/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-admin-user-list-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-list-component.html',
  styleUrl: './admin-user-list-component.scss'
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  private adminService = inject(AdminService);

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  users: RegisterUser[] = [];
  query = '';

  constructor() {
    console.log("...amdin user list component...");
  }

  ngOnInit() {
    this.loadUsers();

    // remove shaking-debounce
    this.searchSubject
      .pipe(
        debounceTime(400),           // dely 400ms
        distinctUntilChanged(),      // triggered only input changed
        takeUntil(this.destroy$)     // cancel subscript when component destroy
      )
      .subscribe(async (q) => {
        this.loadUsers();
      });
  }

  private loadUsers(): void {
    this.adminService.getUsers(this.query).subscribe(res => {
      this.users = res;
    });
  }

  onLoadUsers(): void {
    this.loadUsers();
  }

  onSearchChange(value: string) {
    this.searchSubject.next(value);
  }

  onSaveRole(user: RegisterUser): void {
    if (!['customer', 'employee'].includes(user.role)) {
      console.error('...user role is not right.');
      return;
    }

    this.adminService.updateRole(user._id, user.role).subscribe(() => {
      console.log('...update role successfully!');
    });
  }

  onReset(): void {
    this.query = '';
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
