import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { JsonFormComponent } from './json-form/json-form.component';
import { DynamicValidatorComponent } from './json-form/dynamic-validator/dynamic-validator.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonFormComponent,
    DynamicValidatorComponent,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
