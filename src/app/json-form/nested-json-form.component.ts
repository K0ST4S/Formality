import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CustomValidators } from './../utils/custom-validators';

export interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
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
  value: string | number | boolean | JsonFormData;
  type: string;
  options?: JsonFormControlOptions;
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
  Article = 'article',
  Checkbox = 'checkbox',
  Switch = 'switch',
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
  MinLength = 'minlength',
  MaxLength = 'maxlength',
}

@Component({
  selector: 'app-nested-json-form',
  templateUrl: './nested-json-form.component.html',
  styleUrls: ['./nested-json-form.component.scss'],
})
export class NestedJsonFormComponent {
  private _jsonFormData: JsonFormData;

  @Input() set jsonFormData(value: JsonFormData) {
    if (!value) {
      return;
    }

    this._jsonFormData = value;
    this.formGroup = this.parseJsonFormData(value);
    this.formGroup.valueChanges.subscribe((value) => console.log(value));
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
    const validatorsToAdd: ValidatorFn[] = [];
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
            validatorsToAdd.push(CustomValidators.requiredTrue);
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
        default:
          break;
      }
    }
    return new FormControl(control.value, validatorsToAdd);
  }

  onSubmit() {
    console.log(this.formGroup.value);
    this.onSubmitted.emit(this.formGroup.value);
  }
}
