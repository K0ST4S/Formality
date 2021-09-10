import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { FormalityControl, ValidatorType } from '../formality-data-structures';

@Component({
  selector: 'formality-validator',
  templateUrl: './formality-validator.component.html',
  styleUrls: ['./formality-validator.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormalityValidatorComponent implements OnInit {
  @Input() control: FormalityControl;
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
