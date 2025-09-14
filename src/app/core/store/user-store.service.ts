import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/userModel/User';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private usersSubject = new BehaviorSubject<UserModel[]>([]);
  users$ = this.usersSubject.asObservable();

  // Replace all users
  setUsers(users: UserModel[]) {
    this.usersSubject.next(users);
  }

  // Add a new user
  addUser(user: UserModel) {
    const current = this.usersSubject.getValue();
    this.usersSubject.next([...current, user]);
  }

  // ✅ Add or update (important for edit)
  addOrUpdateUser(user: UserModel) {
    const current = this.usersSubject.getValue();
    const index = current.findIndex(u => u.id === user.id);

    if (index > -1) {
      current[index] = user; // update existing
      this.usersSubject.next([...current]);
    } else {
      this.usersSubject.next([...current, user]); // add new
    }
  }

  // ✅ Find user by ID from cache
  getUserById(id: number): UserModel | undefined {
    return this.usersSubject.getValue().find(u => u.id === id);
  }

  // Get snapshot of all users
  getUsers(): UserModel[] {
    return this.usersSubject.getValue();
  }

  // Clear store
  clearUsers() {
    this.usersSubject.next([]);
  }
}
