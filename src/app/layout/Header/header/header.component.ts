import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/core/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) {}
  userMenuOpen = false;

  toggleSidebar() {
    // Emit event to parent component to toggle sidebar
    // or implement sidebar toggle logic
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout() {
    this.authService.logout();  // Call the logout function from AuthService
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }


}
