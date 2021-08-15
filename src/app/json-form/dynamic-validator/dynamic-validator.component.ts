import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JsonFormValidators, ValidatorType } from './../json-form.component';

@Component({
  selector: 'app-dynamic-validator',
  templateUrl: './dynamic-validator.component.html',
  styleUrls: ['./dynamic-validator.component.scss'],
})
export class DynamicValidatorComponent {
  @Input() validators: JsonFormValidators;
  @Input() control: FormControl;

  // this would generally be replaced with ngx-translate keys and when we would pass a variable to validators that don't require one - nothing would happen.
  public ValidatorMessage = {
    [ValidatorType.Min]: 'Min',
    [ValidatorType.Max]: 'Max',
    [ValidatorType.Required]: 'Required',
    [ValidatorType.RequiredTrue]: 'RequiredTrue',
    [ValidatorType.Email]: 'Email',
    [ValidatorType.MinLength]: 'MinLength',
    [ValidatorType.MaxLength]: 'MaxLength',
    [ValidatorType.Pattern]: 'Pattern',
  };
}
