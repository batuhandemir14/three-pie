export interface Ilanlar {
  Id: number;
  Baslik: string;
  Aciklama: string;
  Fiyat: number;
  Tarih: Date;
  Konum: string;
  User_id: number;
  ResimDosyasi: string;
  User_name?: string;
  User_surname?: string;
  isCurrentUserIlan?: boolean;
  User_email?: string;
  showBasvurButton?: boolean;
}