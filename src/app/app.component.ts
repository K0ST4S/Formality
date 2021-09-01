import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { COUNTRIES } from './country-data/countries';
import {
  JsonFormData,
  NestedJsonFormComponent,
} from './json-form/nested-json-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  countries = COUNTRIES;
  @ViewChild(NestedJsonFormComponent) form: NestedJsonFormComponent;
  public formData: JsonFormData;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('/assets/my-form.json')
      .subscribe((formData: JsonFormData) => {
        this.formData = formData;
      });
  }

  onSubmit(value: any) {
    console.log(this.form.formGroup);
  }
}
