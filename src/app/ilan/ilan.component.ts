import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ilanlar } from '../model/ilanlar';
import { IlanlarService } from '../service/ilanlar.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ilan-ekle',
  templateUrl: './ilan.component.html',
  styleUrls: ['./ilan.component.scss']
})
export class IlanComponent {
  ilan: Ilanlar = {
    Id: 0,
    Baslik: '',
    Aciklama: '',
    Fiyat: 0,
    Tarih: new Date(),
    Konum: '',
    User_id: 0,
    ResimDosyasi: ''
  };
  selectedFile: File = null;
  ilanlars: Ilanlar[] = [];

  constructor(private ilanlarService: IlanlarService, private authService: AuthService, private router: Router) {

  }

  onSubmit() {
    const formData = new FormData();

    formData.append('baslik', this.ilan.Baslik);
    formData.append('aciklama', this.ilan.Aciklama);
    formData.append('konum', this.ilan.Konum);
    formData.append('fiyat', this.ilan.Fiyat.toString());
    formData.append('resimdosyasi', this.ilan.ResimDosyasi);
    formData.append('tarih', new Date(this.ilan.Tarih).toLocaleDateString());






    this.authService.getUserByEmail(this.authService.getCurrentUserEmail()).subscribe(
      (users: any[]) => {
        const currentUser = users.find((user: any) => user.User_email === this.authService.getCurrentUserEmail());
        if (currentUser) {
          console.log('Kullanıcı bilgileri:', currentUser);

          formData.append('user_id', currentUser.User_id.toString());

          // İlan ekleme işlemini gerçekleştirin
          this.ilanlarService.ekleIlan(formData).subscribe(
            (response: any) => {
              console.log('İlan başarıyla eklendi.', response);
              const ilanData: Ilanlar = {
                Id: response.id,
                Baslik: formData.get('baslik') as string,
                Aciklama: formData.get('aciklama') as string,
                Fiyat: parseFloat(formData.get('fiyat') as string),
                Tarih: new Date(),
                Konum: formData.get('konum') as string,
                User_id: parseInt(formData.get('user_id') as string, 10),
                ResimDosyasi: formData.get('resimdosyasi') as string
              };

              this.ilanlars.push(ilanData);
              

              // İlan verileri kullanılabilir
              console.log(ilanData);
              this.router.navigateByUrl('/ilan', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/']);
              });
            },
            error => {
              console.error('İlan eklenirken bir hata oluştu.', error);
            }
          );
        } else {
          console.error('Kullanıcı bilgisi bulunamadı.');
        }
      },
      error => {
        console.error('Kullanıcı bilgileri alınırken bir hata oluştu.', error);
      }
    );

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }



}