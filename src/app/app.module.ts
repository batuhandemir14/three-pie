import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from
  '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoriesComponent } from './categories/categories.component';
import { DropdownHoverDirective } from './model/dropdown-hover.directive';
import { MessageComponent } from './message/message.component';

import { ProfilComponent } from './profil/profil.component';
import { MainprofilComponent } from './mainprofil/mainprofil.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { HelpinfoComponent } from './helpinfo/helpinfo.component';
import { JwtModule } from '@auth0/angular-jwt';
import { IlanComponent } from './ilan/ilan.component';
import { HomiComponent } from './homi/homi.component';
import { DatePipe } from '@angular/common';





@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CategoriesComponent,
    DropdownHoverDirective,
    MessageComponent,
    ProfilComponent,
    MainprofilComponent,
    SignupComponent,
    HelpinfoComponent,
   
    IlanComponent,
    HomiComponent,
    
   
    

  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:44389'],
       
      }
     
    })



  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
