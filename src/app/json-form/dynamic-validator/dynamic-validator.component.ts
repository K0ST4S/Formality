import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { JsonFormControl } from '../json-classes';
import { ValidatorType } from '../json-enums';

@Component({
  selector: 'app-dynamic-validator',
  templateUrl: './dynamic-validator.component.html',
  styleUrls: ['./dynamic-validator.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class DynamicValidatorComponent implements OnInit {
  @Input() control: JsonFormControl;
  public formControl: FormControl;

  constructor(public formDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.formControl = this.formDirective.form.get(
      this.control.name
    ) as FormControl;
  }

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
