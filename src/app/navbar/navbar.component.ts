import { Component,  OnInit,} from '@angular/core';
import { AuthService } from '../service/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']


})

export class NavbarComponent implements OnInit {
  
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

}
