import { Pipe, PipeTransform } from '@angular/core';
import { Phone } from '../models/phone';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(phones: Phone[], searchValue?: string) {
    if (!phones) {
      return [];
    }

    if (!searchValue) {
      return phones;
    }

    searchValue = searchValue.toLowerCase();

    return phones.filter((phone) => {
      return phone.title.toLowerCase().includes(searchValue);
    });
  }
}
