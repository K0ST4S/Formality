import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  JsonFormValidators,
  ValidatorType,
} from '../nested-json-form.component';

@Component({
  selector: 'app-dynamic-validator',
  templateUrl: './dynamic-validator.component.html',
  styleUrls: ['./dynamic-validator.component.scss'],
})
export class DynamicValidatorComponent {
  @Input() validators: JsonFormValidators;
  @Input() control: FormControl;

  // this would generally be replaced with ngx-translate keys and when we would pass a variable to validators that don't require one - nothing would happen.
  public InvalidFeedback = {
    [ValidatorType.Min]: 'Mnimimum value is *',
    [ValidatorType.Max]: 'Maximum value is *',
    [ValidatorType.Required]: 'Required stuff',
    [ValidatorType.RequiredTrue]: 'You must agree',
    [ValidatorType.Email]: 'Not a valid email',
    [ValidatorType.MinLength]: 'Minimum length is *',
    [ValidatorType.MaxLength]: 'Maximum length is *',
  };
}
