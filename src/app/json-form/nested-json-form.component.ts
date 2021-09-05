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

export interface RangeOptions {
  min?: string;
  max?: string;
  step?: string;
}

export interface SelectSettings {
  multiple?: boolean;
}

export interface JsonFormControl {
  name: string;
  label: string;
  value:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | JsonFormControls;
  type: string;
  settings?: RangeOptions & SelectSettings;
  options?: string[] | number[];
  validators: JsonFormValidators;
  controls?: JsonFormControls;
  depth?: number;
}

export type JsonFormControls = JsonFormControl[];

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
  RadioGroup = 'radioGroup',
  Range = 'range',
  Date = 'date',
  Select = 'select',
  Country = 'country',
  File = 'file',
  Image = 'image',
  Form = 'form',
  Group = 'group',
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
  private _jsonFormControls: JsonFormControls;

  @Input() set jsonFormControls(value: JsonFormControls) {
    if (!value) {
      return;
    }

    this._jsonFormControls = value;
    this.formGroup = this.parseJsonFormData(value);
    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  getDirtyValues(form: any) {
    let dirtyValues = {};

    Object.keys(form.controls).forEach((key) => {
      let currentControl = form.controls[key];

      if (currentControl.dirty) {
        if (currentControl.controls)
          dirtyValues[key] = this.getDirtyValues(currentControl);
        else dirtyValues[key] = currentControl.value;
      }
    });

    return dirtyValues;
  }

  get jsonFormControls(): JsonFormControls {
    return this._jsonFormControls;
  }

  @Output() onSubmitted: EventEmitter<any> = new EventEmitter();
  public ValueType = ValueType;
  public formGroup: FormGroup = new FormGroup({});

  constructor() {}

  parseJsonFormData(
    jsonFormData: JsonFormControls,
    formGroup = null,
    depth: number = 1
  ): FormGroup {
    if (!jsonFormData) {
      return null;
    }

    if (!formGroup) formGroup = new FormGroup({});

    for (const formElement of jsonFormData) {
      formElement.depth = depth + 1;
      let newControl: AbstractControl = null;

      switch (formElement.type) {
        case ValueType.Form:
          const jsonFormGroup = formElement as JsonFormControl;
          newControl = this.parseJsonFormData(
            jsonFormGroup.value as JsonFormControls,
            null,
            depth + 1
          );
          formGroup.addControl(formElement.name, newControl);
          break;
        case ValueType.Group:
          newControl = this.parseJsonFormData(
            formElement.controls as JsonFormControls,
            formGroup,
            depth + 1
          );
          break;
        default:
          newControl = this.parseControl(formElement as JsonFormControl);
          formGroup.addControl(formElement.name, newControl);
          break;
      }
    }

    return formGroup;
  }

  private parseControl(control: JsonFormControl): FormControl {
    const validatorsToAdd: ValidatorFn[] = [];
    if (control.validators) {
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
    }
    return new FormControl(control.value, validatorsToAdd);
  }

  onSubmit() {
    console.log(this.formGroup.value);
    this.onSubmitted.emit(this.formGroup.value);
  }
}
