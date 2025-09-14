import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserModel } from 'src/app/core/models/userModel/User';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/core/store/user-store.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  userList: UserModel[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private userStore: UserStore
  ) {}

  ngOnInit(): void {
    // Subscribe to store
    this.userStore.users$.subscribe(users => {
      this.userList = users;
    });

    // Load from API only if empty
    if (this.userStore.getUsers().length === 0) {
      this.loadUsersList();
    }
  }

  loadUsersList(): void {
    this.userService.loadUsersList().subscribe({
      next: (data: UserModel[]) => this.userStore.setUsers(data),
      error: (err) => {
        console.error('Error loading users:', err);
        alert('Failed to load users. Check console.');
      }
    });
  }

  onEditUser(userId: number) {
    this.router.navigate(['user-management/user-update', userId]);
  }
}
