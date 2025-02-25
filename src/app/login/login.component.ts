import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: false,
  //imports: [FormsModule,RouterModule,HttpClientModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  
  credentials = { username: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {

        if (response.token) 
        {
        this.authService.setUserDetails(response.token, response.role, response.username);
        // Redirect based on role
        if (response.role === 'MANAGER') {
          // this.router.navigate(['/MANAGER']);
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }
        // localStorage.setItem('token', response.token);
        // this.router.navigate(['products']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }


}
