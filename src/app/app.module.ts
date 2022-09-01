import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PhonesComponent } from './components/phones/phones.component';
import { PhoneFormComponent } from './components/phone-form/phone-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './helpers/filter.pipe';
import { appStoreProviders } from './app.store';
import { NgPhoneForDemoComponent } from './components/ng-phone-for/ng-phone-for.component';

@NgModule({
  declarations: [
    AppComponent,
    PhonesComponent,
    PhoneFormComponent,
    FilterPipe,
    NgPhoneForDemoComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [appStoreProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
