import { Component, OnInit } from '@angular/core';
import { Phone } from 'src/app/models/phone';

@Component({
  selector: 'app-ng-phone-for',
  templateUrl: './ng-phone-for.component.html',
})
export class NgPhoneForDemoComponent implements OnInit {
  phones: Phone[];

  constructor() {}

  ngOnInit(): void {
    this.phones = [
      {
        id: 1,
        title: 'iPhone 1',
        image: 'assets/img/1.jpg',
        price: 100,
        numberInStock: 5,
      },
      {
        id: 2,
        title: 'iPhone 2',
        image: 'assets/img/2.jpg',
        price: 200,
        numberInStock: 6,
      },
      {
        id: 3,
        title: 'iPhone 3',
        image: 'assets/img/3.jpg',
        price: 300,
        numberInStock: 7,
      },
    ];
  }
}
