
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from '../service/city.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [CityService]
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  cities: { id: number, name: string }[];
  genders: { id: number, name: string }[];


  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router,private cityService: CityService) { }

  ngOnInit(): void {
    this.cities = this.cityService.cities;
    this.genders = this.cityService.genders;
    this.signupForm = this.formBuilder.group({
      user_id: ['0'],
      user_name: [''],
      user_surname: [''],
      user_city_id: [''],
      user_gender_id: [''],
      user_email: [''],
      user_password: ['']

    })
  }

  signUp() {
    if (this.signupForm.invalid) {
      alert("Lütfen formu doğru şekilde doldurun.");
      return;
    }
  
    this._http.post<any>('https://localhost:44389/api/users/', this.signupForm.value,{ responseType: 'json' }).subscribe(res => {
      alert("Kayıt Başarılı");
      this.signupForm.reset();
      this.router.navigate([''])
    }, err => {
      console.log(err); 
      alert("Kayıt Başarısız")
    })
  }
}
