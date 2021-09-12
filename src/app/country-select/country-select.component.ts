import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { COUNTRIES } from './../country-data/countries';
import { Country } from './../country-data/country';
import { FormalityControlComponent } from './../formality/formality-control/formality-control.component';
import { FormalityControl } from './../formality/formality-data-structures';

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
export class CountrySelectComponent {
  public countries: Country[] = COUNTRIES;
  @Input() control: FormalityControl;

  constructor(public controlComponent: FormalityControlComponent) {}
}
