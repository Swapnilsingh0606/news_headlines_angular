import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersKey = 'users';
  private guestsKey = 'guests';
  public currentUserRole: string | undefined = '';

  constructor() { }

  register(username: string, password: string, role: string): boolean {
    const users = this.getUsers();
    if (users.find(user => user.username === username)) {
      return false;
    }
    users.push({ username, password, role });
    localStorage.setItem(this.usersKey, JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): User | null {
    const users = this.getUsers();
    const user = users.find(user => user.username === username && user.password === password);
    this.currentUserRole = user?.role;
    return user || null;
  }

  getUsers(): User[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  getCurrentUser() {
    return this.currentUserRole;
  }

  generateRandomGuest() {
    const guest = {
      name: `Guest_${Math.floor(Math.random() * 10000)}`,
      visitDate: new Date()
    };

    const guests = this.getGuests();
    guests.push(guest);
    localStorage.setItem(this.guestsKey, JSON.stringify(guests));
  }

  getGuests(): { name: string, visitDate: Date }[] {
    const guests = localStorage.getItem(this.guestsKey);
    return guests ? JSON.parse(guests) : [];
  }
}
