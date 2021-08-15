import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DynamicValidatorComponent } from './json-form/dynamic-validator/dynamic-validator.component';
import { JsonFormControlComponent } from './json-form/json-form-control/json-form-control.component';
import { JsonFormComponent } from './json-form/json-form/json-form.component';
import { NestedJsonFormComponent } from './json-form/nested-json-form.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonFormComponent,
    DynamicValidatorComponent,
    JsonFormControlComponent,
    NestedJsonFormComponent,
  ],
  imports: [ReactiveFormsModule, HttpClientModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
