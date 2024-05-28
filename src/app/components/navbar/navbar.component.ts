import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/home']);
  }

}
