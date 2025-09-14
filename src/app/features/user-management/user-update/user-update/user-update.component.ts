import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, UserType } from 'src/app/core/services/user/user.service';
import { UserModel } from 'src/app/core/models/userModel/User';
import { UserStore } from 'src/app/core/store/user-store.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userId: number | null = null;
  user: UserModel | null = null; // To store the user data
  userTypes: UserType[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService,  private userStore: UserStore) { }

  ngOnInit(): void {
    // Get the userId from the route parameters
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      this.loadUserLevel();
      // debugger
      this.loadUserDetails(this.userId);  // Fetch user details
    }
  }
  loadUserLevel(): void {
    this.userService.getUserTypes().subscribe(

      (data: UserType[]) => { // Adjust to expect an array
        this.userTypes = data;  // Store the userTypes
      },
      (error) => {
        console.error('Error fetching user types:', error);
        alert('Failed to load user types. Check the console for details.');
      }
    );

  }

loadUserDetails(userId: number): void {
  //  First check store
  const cachedUser = this.userStore.getUserById(userId);

  if (cachedUser) {
    this.user = cachedUser;
    return; // Skip API call if cached
  }

  // Otherwise fetch from API
  this.userService.getUserById(userId).subscribe(
    (data: UserModel) => {
      this.user = data;
      this.userStore.addOrUpdateUser(data); // ✅ cache for later
    },
    (error) => {
      console.error('Error fetching user details:', error);
      alert('Failed to load user details. Check the console for details.');
    }
  );
}

  onUpdateUser() {
    debugger
    if (this.user) {
      this.userService.updateUser(this.user).subscribe(
        response => {
          if (response) {
            console.log('User updated successfully:', response);
            alert('User updated successfully.');
          } else {
            console.error('Error updating user: Update failed');
            alert('Failed to update user. Please try again.');
          }
        },
        error => {
          console.error('Error updating user:', error);
          alert('Failed to update user. Check the console for details.');
        }
      );
    }

  }

}
