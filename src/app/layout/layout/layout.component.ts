import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { debounce } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  showSidebar = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to determine if the sidebar should be displayed
    //debugger  

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.url);
      }
    });

    // Initial check on load
    this.checkRoute(this.router.url);
  }

  private checkRoute(url: string): void {
//      debugger

    // Customize this logic based on where you want the sidebar to appear
    this.showSidebar = !url.startsWith('/login');  // Hide sidebar on login page
  }
}
