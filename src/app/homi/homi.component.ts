import { Component, OnInit } from '@angular/core';
import { Ilanlar } from '../model/ilanlar';
import { IlanlarService } from '../service/ilanlar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homi',
  templateUrl: './homi.component.html',
  styleUrls: ['./homi.component.scss']
})
export class HomiComponent implements OnInit {
  public ilanlar: any;

  constructor(private ilanlarService: IlanlarService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getIlanlar();
  }

  getIlanlar(): void {
    this.ilanlarService.getIlanlar().subscribe(data=>{
      this.ilanlar = data

    })



  }
 
}
