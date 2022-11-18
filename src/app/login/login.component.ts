import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { UserServices } from '../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    // role: new FormControl('', [Validators.required]),
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  submitted = false;
  user: User;
  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserServices) { }

  ngOnInit(): void {}
    get f() {
      return this.loginForm.controls;
    }
   onSubmit() {
     this.submitted = true;
  
      // stop here if form is invalid
      if (this.loginForm.invalid) {
        console.log('Invalid');
      } 
      else {
        console.log('Valid');
        this.authService.login(this.loginForm.value).subscribe((response) => {
          this.authService.saveToken(response.headers.get('JWT'));
          if (this.authService.isUserLoggedIn) {
            this.user = response.body;
            this.userService.addUserToLocalCache(this.user);
            if (this.user.role === 'ROLE_USER') {
              this.router.navigate(['/home']);
            } else if (this.user.role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin/foods']);
            }
          } else {
            this.router.navigate(['/login']);
          }
        });
      }
    }
  }
  
