import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

export interface JsonFormControl {
  name: string;
  label: string;
  value: string | JsonFormData;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControl[];
}

export enum ValueType {
  Text = 'text',
  Password = 'password',
  Email = 'email',
  Number = 'number',
  Search = 'search',
  Mobile = 'tel',
  Url = 'url',
  Textarea = 'textarea',
  Checkbox = 'checkbox',
  Toggle = 'toggle',
  Radio = 'radio',
  Range = 'range',
  Date = 'date',
  Singleselect = 'singleselect',
  Multiselect = 'multiselect',
  Countryselect = 'countryselect',
  File = 'file',
  Image = 'image',
  Form = 'form',
}

export enum ValidatorType {
  Min = 'min',
  Max = 'max',
  Required = 'required',
  RequiredTrue = 'requiredTrue',
  Email = 'email',
  MinLength = 'minLength',
  MaxLength = 'maxLength',
  Pattern = 'pattern',
}

@Component({
  selector: 'app-nested-json-form',
  templateUrl: './nested-json-form.component.html',
  styleUrls: ['./nested-json-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedJsonFormComponent {
  private _jsonFormData: JsonFormData;

  @Input() set jsonFormData(value: JsonFormData) {
    this._jsonFormData = value;
    this.formGroup = this.parseJsonFormData(value);
  }

  get jsonFormData(): JsonFormData {
    return this._jsonFormData;
  }

  @Output() onSubmitted: EventEmitter<any> = new EventEmitter();
  public ValueType = ValueType;
  public formGroup: FormGroup = new FormGroup({});

  constructor() {}

  parseJsonFormData(jsonFormData: JsonFormData): FormGroup {
    if (!jsonFormData) {
      return null;
    }

    const formGroup = new FormGroup({});
    for (const control of jsonFormData.controls) {
      const newControl: AbstractControl =
        control.type === ValueType.Form
          ? this.parseJsonFormData(control.value as JsonFormData)
          : this.parseControl(control);
      formGroup.addControl(control.name, newControl);
    }
    return formGroup;
  }

  private parseControl(control: JsonFormControl): FormControl {
    const validatorsToAdd = [];
    for (const [key, value] of Object.entries(control.validators)) {
      switch (key) {
        case ValidatorType.Min:
          validatorsToAdd.push(Validators.min(value));
          break;
        case ValidatorType.Max:
          validatorsToAdd.push(Validators.max(value));
          break;
        case ValidatorType.Required:
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
          break;
        case ValidatorType.RequiredTrue:
          if (value) {
            validatorsToAdd.push(Validators.requiredTrue);
          }
          break;
        case ValidatorType.Email:
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
          break;
        case ValidatorType.MinLength:
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case ValidatorType.MaxLength:
          validatorsToAdd.push(Validators.maxLength(value));
          break;
        case ValidatorType.Pattern:
          validatorsToAdd.push(Validators.pattern(value));
          break;
        default:
          break;
      }
    }

    return new FormControl(control.value, validatorsToAdd);
  }

  onSubmit() {
    console.log('Form valid: ', this.formGroup.valid);
    console.log('Form values: ', this.formGroup.value);
  }
}
