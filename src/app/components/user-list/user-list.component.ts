import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];
  user: User;

  currentPage = 1;
  pagesNumber: number;
  private userDataSubscription: Subscription;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
    //   this.userDataSubscription = this.userService.userData$.subscribe((data) => {
    //     this.user = data?.data;
    //   });
    this.userDataSubscription = this.userService.userData$.subscribe({
      next: (data) => {
        this.user = data?.data;
      },
      error: () => {
        this.user = null;
      },
    });
  }

  loadUsers() {
    this.userService.getUsers(this.currentPage).subscribe((response) => {
      this.pagesNumber = response?.total_pages;
      this.users = response?.data;
    });
  }

  onPageChange(page) {
    this.currentPage = page;
    this.loadUsers();
  }
}
