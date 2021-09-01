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
import { DynamicValidatorComponent } from './json-form/dynamic-validator/dynamic-validator.component';
import { DateInterceptor } from './json-form/interceptors/date.interceptor';
import { JsonFormControlComponent } from './json-form/json-form-control/json-form-control.component';
import { JsonFormComponent } from './json-form/json-form/json-form.component';
import { NestedJsonFormComponent } from './json-form/nested-json-form.component';
import { NgBootstrapDatetimeModule } from './ng-bootstrap-datetime/ng-bootstrap-datetime.module';
import { TestBootstrapComponent } from './test-bootstrap/test-bootstrap.component';
import { RemoveWrapperDirective } from './utils/remove-wrapper.directive';

@NgModule({
  declarations: [
    AppComponent,
    JsonFormComponent,
    DynamicValidatorComponent,
    JsonFormControlComponent,
    NestedJsonFormComponent,
    TestBootstrapComponent,
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
