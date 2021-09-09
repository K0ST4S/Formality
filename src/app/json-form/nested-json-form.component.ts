import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CustomValidators } from './../utils/custom-validators';
import { JsonFormControl, JsonFormControls } from './json-classes';
import { ValidatorType, ValueType } from './json-enums';

@Component({
  selector: 'app-nested-json-form',
  templateUrl: './nested-json-form.component.html',
  styleUrls: ['./nested-json-form.component.scss'],
})
export class NestedJsonFormComponent {
  private _jsonFormControls: JsonFormControls;
  @Output() onSubmitted: EventEmitter<any> = new EventEmitter();
  public ValueType = ValueType;
  public formGroup: FormGroup = new FormGroup({});
  public baseControl: Partial<JsonFormControl> = {
    label: 'Form Magic!',
    name: 'formMagic',
  };

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

  get jsonFormControls(): JsonFormControls {
    return this._jsonFormControls;
  }

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
