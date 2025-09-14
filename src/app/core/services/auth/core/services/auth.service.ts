import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/core/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl('User'); // Use 'User' controller for API URL
  }
  // Mock method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Method to log in (mock example)
  login(token: string) {
    //debugger
    console.log('Logging in with token:', token);
    localStorage.setItem('authToken', token);  // Store the token in localStorage
  }

  // Method to log out
  logout() {
    localStorage.removeItem('authToken');  // Remove the token from localStorage
  }

  checkUserCredentials(username: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/CheckUser?userName=${username}&password=${password}`);
  }

}
