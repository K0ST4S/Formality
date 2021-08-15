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

interface JsonFormValidators {
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

interface JsonFormControl {
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

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent {
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
        case 'min':
          validatorsToAdd.push(Validators.min(value));
          break;
        case 'max':
          validatorsToAdd.push(Validators.max(value));
          break;
        case 'required':
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
          break;
        case 'requiredTrue':
          if (value) {
            validatorsToAdd.push(Validators.requiredTrue);
          }
          break;
        case 'email':
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
          break;
        case 'minLength':
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case 'maxLength':
          validatorsToAdd.push(Validators.maxLength(value));
          break;
        case 'pattern':
          validatorsToAdd.push(Validators.pattern(value));
          break;
        case 'nullValidator':
          if (value) {
            validatorsToAdd.push(Validators.nullValidator);
          }
          break;
        default:
          break;
      }
    }

    return new FormControl(control.value, validatorsToAdd);
  }

  public getControlClass(control: JsonFormControl): string {
    return `.${control.name}`;
  }

  onSubmit() {
    console.log('Form valid: ', this.formGroup.valid);
    console.log('Form values: ', this.formGroup.value);
  }
}
