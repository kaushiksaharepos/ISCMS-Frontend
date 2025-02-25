import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
   standalone: false,
  // imports: [RouterOutlet, RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor( public authService: AuthService, private _router: Router, private route: ActivatedRoute){}
  ngOnInit(){
    console.log('Auth status:');
      console.log(this.authService.isLoggedIn());
      if(this.authService.isLoggedIn() !==true)
      {
        this._router.navigate(['/login']);
      }
    
    
  }
}
