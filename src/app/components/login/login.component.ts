import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public role: string = '';
  public isLoggedIn: boolean = false;

  constructor(private userService: UserService, private router: Router, private alert: AlertService) {}

  ngOnInit(): void {
  }

  login() {
    const user = this.userService.login(this.username, this.password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    } else {
      this.alert.error('Invalid Username or Password');
    }
  }

}
