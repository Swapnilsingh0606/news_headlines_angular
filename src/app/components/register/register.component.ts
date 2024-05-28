import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public role: string = 'User'; 

  constructor(private router: Router, private userService: UserService, private alert: AlertService) { }

  ngOnInit(): void {
  }

  register() {
    const success = this.userService.register(this.username, this.password, this.role);
    if (success) {
      this.alert.success('You successfully registered');
      this.router.navigate(['/login']);
    } else {
      this.alert.error('Username already exists!');
    }
  }

}
