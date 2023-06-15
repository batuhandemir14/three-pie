import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tarihFormati'
})
export class TarihFormatiPipe implements PipeTransform {
  transform(value: Date): string {
    const date = new Date(value);
    const formattedDate = date.toLocaleDateString('tr-TR');
    return formattedDate;
  }
}