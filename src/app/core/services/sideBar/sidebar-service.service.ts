import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SidebarMenuItem } from '../../models/sideBarModel/SidebarMenuItem';
import { ConfigService } from 'src/app/core/core/config.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {
private apiUrl: string;

// SidebarServiceService is responsible for fetching sidebar menu items from the server
// It uses HttpClient to make HTTP requests and ConfigService to get the API URL
  constructor(private http: HttpClient,private configService: ConfigService) {
  this.apiUrl = this.configService.getApiUrl('User'); // Use 'User' controller for API URL

   }

  // Method to get sidebar menu items
  getSidebarMenuItems(): Observable<SidebarMenuItem[]> {
    return this.http.get<SidebarMenuItem[]>(`${this.apiUrl}/GetSidebarMenuItems`);
  }

  

}
