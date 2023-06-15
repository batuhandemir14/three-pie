import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { AdditionalInfoService } from '../service/additional-info.service';
import { AdditionalInfoUpdateModel } from '../model/additionalInfoUpdateModel';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: User;
  additionalInfo: AdditionalInfoUpdateModel;

  constructor(
    private authService: AuthService,
    private additionalInfoService: AdditionalInfoService
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getAdditionalInfo();
  }

  getUserData(): void {
    this.authService.getLoggedInUserId().subscribe(
      userId => {
        this.authService.getUserById(userId).subscribe(
          user => {
            this.user = user;
          },
          error => {
            console.error('User fetch error:', error);
          }
        );
      },
      error => {
        console.error('Logged in user ID fetch error:', error);
      }
    );
  }

  getAdditionalInfo(): void {
    this.authService.getLoggedInUserId().subscribe(
      userId => {
        this.additionalInfoService.getAdditionalInfo().subscribe(
          additionalInfo => {
            this.additionalInfo = additionalInfo;
          },
          error => {
            console.error('Additional info fetch error:', error);
          }
        );
      },
      error => {
        console.error('User ID fetch error:', error);
      }
    );
  }

  updateUser(): void {
  this.authService.getLoggedInUserId().subscribe(
    userId => {
      this.authService.getUserById(userId).subscribe(
        user => {
          // Kullanıcı bilgilerini güncelleme işlemi
          this.authService.updateUser(this.user).subscribe(
            () => {
              console.log('User updated successfully.');
            },
            error => {
              console.error('User update error:', error);
            }
          );

          // Ek bilgileri güncelleme işlemi
          this.additionalInfoService.updateAdditionalInfo(this.additionalInfo).subscribe(
            () => {
              console.log('Additional info updated successfully.');
            },
            error => {
              console.error('Additional info update error:', error);
            }
          );
        },
        error => {
          console.error('User fetch error:', error);
        }
      );
    },
    error => {
      console.error('Logged in user ID fetch error:', error);
    }
  );
}
}