import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'redux';
import { AppState } from 'src/app/app.state';
import { AppStore } from 'src/app/app.store';
import { Phone } from 'src/app/models/phone';
import { PhoneService } from 'src/app/services/phone.service';
import * as CounterActions from '../../counter.actions';

@Component({
  selector: 'app-phone-form',
  templateUrl: './phone-form.component.html',
})
export class PhoneFormComponent implements OnInit {
  phoneForm: FormGroup = this.formBuilder.group({
    id: '',
    title: ['', [Validators.required, Validators.minLength(1)]],
    image: '',
    price: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(3),
      ],
    ],
    numberInStock: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(1),
      ],
    ],
  });

  add: boolean = true;

  @Output() onAddEvent: EventEmitter<Phone> = new EventEmitter();

  @Output() onUpdateEvent: EventEmitter<Phone> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private phoneService: PhoneService,
    @Inject(AppStore) private store: Store<AppState>
  ) {
    store.subscribe(() => this.readState());
    this.readState();
  }
  readState() {
    const state: AppState = this.store.getState() as AppState;

    if (state.counter <= 0) {
      state.counter = 0;
    }

    this.phoneForm.get('numberInStock').setValue(state.counter);
  }

  inc() {
    this.store.dispatch(CounterActions.increment());
  }

  dec() {
    this.store.dispatch(CounterActions.decrement());
  }

  ngOnInit(): void {
    // Init form group
    this.initMyValidation();

    // Subscribe to the selected phone observable
    this.phoneService.selectedPhone.subscribe((phone) => {
      if (phone.id != null) {
        this.add = false;

        this.phoneForm.controls['id'].setValue(phone.id);
        this.phoneForm.controls['title'].setValue(phone.title);
        this.phoneForm.controls['image'].setValue(phone.image);
        this.phoneForm.controls['price'].setValue(phone.price);
        this.phoneForm.controls['numberInStock'].setValue(phone.numberInStock);
      }
    });
  }

  onSubmit() {
    if (this.add) {
      const { title, price, numberInStock } = this.phoneForm.value;

      let randomImageNumber: number = Math.trunc(Math.random() * 3 + 1);

      const phone: Phone = {
        id: this.phoneService.getNextId() + 1,
        title,
        image: `assets/img/${randomImageNumber}.jpg`,
        price: +price,
        numberInStock,
      };

      this.onAddEvent.emit(phone);
    } else {
      const { id, title, image, price, numberInStock } = this.phoneForm.value;

      const updPhone: Phone = {
        id,
        title,
        image,
        price: +price,
        numberInStock,
      };

      this.onUpdateEvent.emit(updPhone);

      console.log(updPhone);
    }

    this.clearState();
  }

  clearState() {
    this.add = true;

    this.phoneForm.controls['id'].setValue('');
    this.phoneForm.controls['title'].setValue('');
    this.phoneForm.controls['image'].setValue('');
    this.phoneForm.controls['price'].setValue('');
    this.phoneForm.controls['numberInStock'].setValue('');

    this.phoneService.clearState();

    this.initMyValidation();

    // this.phoneService.initState();
  }

  initMyValidation() {
    this.phoneForm = this.formBuilder.group({
      id: '',
      title: ['', [Validators.required, Validators.minLength(1)]],
      image: '',
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(3),
        ],
      ],
      numberInStock: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.minLength(1),
        ],
      ],
    });
  }

  validateTitle() {
    const input = this.phoneForm.get('title');

    return (
      ((input.touched || input.dirty) && input.hasError('required')
        ? 'is-invalid'
        : '') ||
      ((input.touched || input.dirty) && input.hasError('minlength')
        ? 'is-invalid'
        : '') ||
      ((input.touched || input.dirty) && input.valid ? 'is-valid' : '')
    );
  }

  validatePrice() {
    const input = this.phoneForm.get('price');

    return (
      ((input.touched || input.dirty) && input.hasError('required')
        ? 'is-invalid'
        : '') ||
      ((input.touched || input.dirty) && input.hasError('minlength')
        ? 'is-invalid'
        : '') ||
      ((input.touched || input.dirty) && input.hasError('pattern')
        ? 'is-invalid'
        : '') ||
      ((input.touched || input.dirty) && input.valid ? 'is-valid' : '')
    );
  }

  validateInStock() {
    const input = this.phoneForm.get('numberInStock');

    return (
      ((input.touched || input.dirty) && input.hasError('required')
        ? 'is-invalid'
        : '') ||
      ((input.touched || input.dirty) && input.hasError('minlength')
        ? 'is-invalid'
        : '') ||
      ((input.touched || input.dirty) && input.hasError('pattern')
        ? 'is-invalid'
        : '') ||
      ((input.touched || input.dirty) && input.valid ? 'is-valid' : '')
    );
  }

  notValidPrice() {
    if (this.phoneForm.get('price').hasError('minlength')) {
      console.log('Price ne moze biti manji od 3 karaktera.');
      return 'Min length is 3';
    } else {
      return '';
    }
  }
}
