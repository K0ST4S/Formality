import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { COUNTRIES } from './../country-data/countries';
import { Country } from './../country-data/country';
import { JsonFormControl } from './../json-form/nested-json-form.component';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class CountrySelectComponent {
  public countries: Country[] = COUNTRIES;
  @Input() control: JsonFormControl;
}