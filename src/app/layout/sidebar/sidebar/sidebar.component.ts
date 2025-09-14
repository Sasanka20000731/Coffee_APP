import { Component, OnInit } from '@angular/core';
import { SidebarServiceService } from 'src/app/core/services/sideBar/sidebar-service.service';
import { SidebarMenuItem } from 'src/app/core/models/sideBarModel/SidebarMenuItem';
import { AuthService } from 'src/app/core/services/auth/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  ticketsMenuOpen = false;
  userMenuOpen = false;

   menuItems: SidebarMenuItem[] = [];
     expandedItems: { [label: string]: boolean } = {};
  // menuItems: ISidebarMenuItem[] = []; // Use the interface if needed
  // menuItems: SidebarMenuItem[] = []; // Use the class if needed
  constructor(
    private sidebarService: SidebarServiceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sidebarService.getSidebarMenuItems().subscribe((data) => {
      this.menuItems = data;
    });
  }

  // Toggle Tickets submenu
  toggleTicketsMenu() {
    debugger
    this.ticketsMenuOpen = !this.ticketsMenuOpen;
    this.userMenuOpen = false; // Close other menu if open
  }

  toggleSubmenu(item: SidebarMenuItem) {
    if (item.subItems) {
      this.expandedItems[item.lable] = !this.expandedItems[item.lable];
    }
  }

  // Toggle User Management submenu
  toggleUserMenu() {
    debugger
    this.userMenuOpen = !this.userMenuOpen;
    this.ticketsMenuOpen = false; // Close other menu if open
  }
}