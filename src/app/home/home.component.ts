import { Component, OnInit,  } from '@angular/core';
import { Ilanlar } from '../model/ilanlar';
import { IlanlarService } from '../service/ilanlar.service';


import { AuthService } from '../service/auth.service';
import { User } from '../model/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  ilanlars: Ilanlar[] = [];
  currentUser: User | null = null;
  

  constructor(private ilanlarService: IlanlarService,private authService: AuthService, ) { }

  ngOnInit(): void {
   
    this.getCurrentUser();
  }

 getCurrentUser(): void {
  this.authService.getCurrentUser().subscribe({
    next: (user: User) => {
      this.currentUser = user;
      this.getIlanlar(); // İlanları kullanıcı bilgileri alındıktan sonra getir
    },
    error: (error) => {
      console.log(error);
    }
  });
}

 

getIlanlar(): void {
  this.ilanlarService.getIlanlar().subscribe({
    next: (data: Ilanlar[]) => {
      this.ilanlars = data;
      this.ilanlars.forEach((ilan) => {
        this.authService.getUserById(ilan.User_id).subscribe({
          next: (user: User) => {
            ilan.User_name = user.User_name;
            ilan.User_surname = user.User_surname;
            ilan.isCurrentUserIlan = (user.User_id === this.currentUser?.User_id);
          },
          error: (error) => {
            console.log(error);
          }
        });
      });
    },
    error: (error) => {
      console.log(error);
    }
  });
}

}