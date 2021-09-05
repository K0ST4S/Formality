import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { COUNTRIES } from './country-data/countries';
import {
  JsonFormControls,
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
  public formData: JsonFormControls;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('/assets/my-form.json')
      .subscribe((formData: JsonFormControls) => {
        this.formData = formData;
      });
  }

  onSubmit(value: any) {
    console.log(this.form.formGroup);
  }
}
