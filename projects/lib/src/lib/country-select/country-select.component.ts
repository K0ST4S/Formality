import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { COUNTRIES } from './../country-data/countries';
import { Country } from './../country-data/country';
import { ControlBase } from './../formality/formality-control/control-base';

@Component({
  selector: 'country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectComponent extends ControlBase {
  public countries: Country[] = COUNTRIES;
}
