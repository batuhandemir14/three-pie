import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';
import { CityService } from '../service/city.service';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdditionalInfoUpdateModel } from '../model/additionalInfoUpdateModel';
import { AdditionalInfoService } from '../service/additional-info.service';


@Component({
  selector: 'app-mainprofil',
  templateUrl: './mainprofil.component.html',
  styleUrls: ['./mainprofil.component.scss']
})
export class MainprofilComponent implements OnInit {
  profileImageUrl: string = 'https://via.placeholder.com/300x300';
  user: any;
  additionalInfo: AdditionalInfoUpdateModel;
  currentUser: any;
  location: string;
  gender: string;
  constructor(private authService: AuthService, private cityService: CityService, private additionalInfoService: AdditionalInfoService) { }
  ngOnInit(): void {
    this.getCurrentUser();
  }
  getCurrentUser(): void {
    this.authService.getLoggedInUserId().pipe(
      switchMap((userId: number) => {
        return this.authService.getUserById(userId).pipe(
          switchMap((user: User) => {
            this.currentUser = user;
            this.location = this.cityService.getCityById(user.User_city_id);
            this.gender = this.cityService.getCityByGender(user.User_gender_id);

            return this.additionalInfoService.getAdditionalInfo();
          })
        );
      })
    ).subscribe(
      (additionalInfo: any) => {
        this.additionalInfo = additionalInfo;
      },
      error => {
        console.error('Kullanıcı bilgileri alınırken bir hata oluştu.', error);
      }
    );

    
  }
  
  
  changeProfileImage() {
    // Profil resmini güncellemek için gerekli işlemleri buraya ekleyin
    // Yeni profil resmi URL'sini `profileImageUrl` değişkenine atayın
    this.profileImageUrl = 'https://picsum.photos/300/300';
  }


  uploadProfileImage(event: any): void {
    const file = event.target.files[0]; // İlk seçilen dosyayı al
    const reader = new FileReader();
  
    reader.onload = (e: any) => {
      // Dosya yüklendiğinde çalışacak kod
      this.profileImageUrl = e.target.result; // Profil resmi URL'sini güncelle
    };
  
    // Dosyayı oku ve URL'sini al
    reader.readAsDataURL(file);
  }
  
  
}
