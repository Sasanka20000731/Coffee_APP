import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService,UserType } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-registraion',
  templateUrl: './user-registraion.component.html',
  styleUrls: ['./user-registraion.component.css']
})
export class UserRegistraionComponent implements OnInit {

  userTypes: UserType[] = [];
  selectedUserTypeId: number | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    //debugger
    this.loadUserTypes();
  }

    
  loadUserTypes(): void {
    //debugger
    this.userService.getUserTypes().subscribe(
      (data: UserType[]) => {
        console.log('User Types Loaded:', data);
        this.userTypes = data;
      },
      (error) => {
        console.error('Error loading user types:', error);
        alert('Failed to load user types. Check the console for details.');
      }
    );
  }

  onSubmit(form: NgForm) {
    debugger
    if (form.valid) {

      this.registerUser(form);
      console.log('Form Data:', form.value);
      // Handle form submission logic here
    }
  }

  registerUser(form: NgForm) {
    //debugger
    if (form.valid) {
      console.log('Form Data:', form.value);
      // Handle user registration logic here
      // You can call a service to save the user data
      this.userService.registerUser(form.value).subscribe(
  
        response => {
                debugger
          console.log('User registered successfully:', response);
          alert('User registered successfully!');
          form.reset();
        },
        error => {
                debugger
          console.error('Error registering user:', error);
          alert('Failed to register user. Check the console for details.');
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }


  

}
