import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { QuillModule } from 'ngx-quill';
import { AppComponent } from './app.component';
import { CountrySelectComponent } from './country-select/country-select.component';
import { FlagIconComponent } from './flag-icon/flag-icon.component';
import { JsonFormControlComponent } from './formality/formality-control/formality-control.component';
import { JsonFormComponent } from './formality/formality-form/formality-form.component';
import { FormalityValidatorComponent } from './formality/formality-validator/formality-validator.component';
import { FormalityComponent } from './formality/formality.component';
import { DateInterceptor } from './interceptors/date.interceptor';
import { NgBootstrapDatetimeModule } from './ng-bootstrap-datetime/ng-bootstrap-datetime.module';
import { RemoveWrapperDirective } from './utils/remove-wrapper.directive';

@NgModule({
  declarations: [
    AppComponent,
    JsonFormComponent,
    FormalityValidatorComponent,
    JsonFormControlComponent,
    FormalityComponent,
    RemoveWrapperDirective,
    CountrySelectComponent,
    FlagIconComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    NgbModule,
    NgBootstrapDatetimeModule,
    QuillModule.forRoot(),
    NgSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
