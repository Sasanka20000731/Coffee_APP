import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    //debugger
   this.authService.checkUserCredentials(this.username, this.password).subscribe(
     (response: any) => {
       debugger
       if (response) {
          this.authService.login('fake-jwt-token'); // Simulate a login
          this.router.navigate(['/dashboard']); // Navigate to the dashboard after login
       } else {
         alert('Invalid login credentials');
       }
     },
      (error) => {
        console.error('Login failed:', error);
        alert('Error occurred during login');
      }
   );
  }
}