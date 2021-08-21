import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { DynamicValidatorComponent } from './json-form/dynamic-validator/dynamic-validator.component';
import { DateInterceptor } from './json-form/interceptors/date.interceptor';
import { JsonFormControlComponent } from './json-form/json-form-control/json-form-control.component';
import { JsonFormComponent } from './json-form/json-form/json-form.component';
import { NestedJsonFormComponent } from './json-form/nested-json-form.component';
import { TestBootstrapComponent } from './test-bootstrap/test-bootstrap.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonFormComponent,
    DynamicValidatorComponent,
    JsonFormControlComponent,
    NestedJsonFormComponent,
    TestBootstrapComponent,
  ],
  imports: [ReactiveFormsModule, HttpClientModule, BrowserModule, NgbModule],
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
