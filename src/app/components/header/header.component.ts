import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/types';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchTerm: number;
  user: User;
  constructor(private userService: UserService) {
    this.loadUsers();
  }

  loadUsers(): void {
    if (this.searchTerm) {
      this.userService.getUser(this.searchTerm).subscribe((data) => {});
    } else {
      this.userService.userData$.next(null);
    }
  }

  onSearchChange(): void {
    this.loadUsers();
  }
}
