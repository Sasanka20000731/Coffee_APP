import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../../models/userModel/User';


export interface UserType {
  value: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = this.configService.getApiUrl('User'); // Use 'User' controller
  }

  getUserTypes(): Observable<any> {
    return this.http.get<UserType[]>(`${this.apiUrl}/GetUserTypes`);
  }



  loadUsersList(): Observable<any> {
    debugger
    return this.http.get<UserModel[]>(`${this.apiUrl}/GetAllUsers`);

  }

  getUserById(userId: number) {
    return this.http.get<UserModel>(`${this.apiUrl}/GetUserById/${userId}`);
  }

  updateUser(user: UserModel): Observable<any> {
    debugger
    return this.http.post<boolean>(`${this.apiUrl}/UpdateUser/`, user);
  }

  registerUser(userData: any): Observable<any> {
    debugger
    return this.http.post<Boolean>(`${this.apiUrl}/CreateUser/`, userData);
  }

}
