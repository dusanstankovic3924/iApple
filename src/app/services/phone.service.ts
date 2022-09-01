import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Phone } from '../models/phone';

@Injectable({
  providedIn: 'root',
})
export class PhoneService {
  private phones: Phone[] = [];

  private phoneSource = new BehaviorSubject<Phone>({
    id: null,
    title: null,
    image: null,
    price: null,
    numberInStock: null,
  });
  selectedPhone = this.phoneSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    const phone1: Phone = {
      id: 1,
      title: 'Phone 1',
      image: 'assets/img/1.jpg',
      price: 900,
      numberInStock: 35,
    };

    const phone2: Phone = {
      id: 2,
      title: 'Phone 2',
      image: 'assets/img/2.jpg',
      price: 1030,
      numberInStock: 11,
    };

    const phone3: Phone = {
      id: 3,
      title: 'Phone 3',
      image: 'assets/img/3.jpg',
      price: 870,
      numberInStock: 15,
    };

    this.phones = [phone1, phone2, phone3];
  }

  // Integrisanje pregleda soba kroz poglede
  getPhones() {
    return of(this.phones);
  }

  getNextId() {
    return Math.max.apply(
      Math,
      this.phones.map((phone) => {
        return phone.id;
      })
    );
  }

  addPhone(phone: Phone) {
    this.phones.unshift(phone);
  }

  deletePhone(phone: Phone) {
    this.phones.forEach((curr, i) => {
      if (phone.id === curr.id) {
        this.phones.splice(i, 1);
      }
    });
  }

  updatePhone(phone: Phone) {
    this.phones.forEach((curr, i) => {
      if (phone.id === curr.id) {
        this.phones.splice(i, 1, phone);
      }
    });
    // this.phones.unshift(phone);
  }

  setFormPhone(phone: Phone) {
    this.phoneSource.next(phone);
  }

  clearState() {
    this.stateSource.next(true);
  }

  initState() {
    this.phoneSource = new BehaviorSubject<Phone>({
      id: null,
      title: null,
      image: null,
      price: null,
      numberInStock: null,
    });
    this.selectedPhone = this.phoneSource.asObservable();

    this.stateSource = new BehaviorSubject<boolean>(true);
    this.stateClear = this.stateSource.asObservable();
  }

  getPrice(kolicina: number, phone: Phone) {
    return kolicina * phone.price;
  }
}
