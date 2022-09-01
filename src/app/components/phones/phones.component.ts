import {
  Component,
  OnInit,
  OnDestroy,
  DoCheck,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
} from '@angular/core';
import { Phone } from 'src/app/models/phone';
import { PhoneService } from 'src/app/services/phone.service';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
})
export class PhonesComponent
  implements
    OnInit,
    OnDestroy,
    DoCheck,
    OnChanges,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked
{
  phones: Phone[] = [];

  searchValue: string; // for search [(ngModel)]

  selectedPhone: Phone = {};

  constructor(private phoneService: PhoneService) {}

  ngOnInit(): void {
    console.log('ngOnInit()');

    // Subscribe to stateClear
    this.phoneService.stateClear.subscribe((clear) => {
      if (clear) {
        this.selectedPhone = {
          id: null,
          title: null,
          image: null,
          price: null,
          numberInStock: null,
        };
      }
    });

    // Set phones to local array
    this.phoneService.getPhones().subscribe((phones) => (this.phones = phones));
  }

  onAddPhone(phone: Phone) {
    this.phoneService.addPhone(phone);

    const old = this.searchValue;
    this.searchValue = '';
    setTimeout(() => {
      this.searchValue = old;
    }, 1);
  }

  onDeletePhone(phone: Phone) {
    if (window.confirm('Da li ste sigurni?')) {
      this.searchValue = '';
      this.phoneService.deletePhone(phone);
    }
  }

  onSelect(phone: Phone) {
    this.phoneService.setFormPhone(phone);
    this.selectedPhone = phone;
  }

  onUpdatePhone(phone: Phone) {
    this.phoneService.updatePhone(phone);
    const old = this.searchValue;
    this.searchValue = '';
    setTimeout(() => {
      this.searchValue = old;
    }, 1);
  }

  onBuy(phone: Phone) {
    const n: number = +window.prompt('How many?');

    console.log('Phone: ', phone);
    console.log(
      `Ukupna cena: ${n}*${phone.price}=${this.phoneService.getPrice(n, phone)}`
    );
  }

  ngOnDestroy() {
    console.log('ngOnDestroy()');
  }

  ngDoCheck() {
    console.log('ngDoCheck()');
  }

  ngOnChanges() {
    console.log('ngOnChanges()');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit()');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked()');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit()');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked()');
  }
}
