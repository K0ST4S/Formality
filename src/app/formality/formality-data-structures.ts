export interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minlength?: boolean;
  maxlength?: boolean;
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

export type JsonFormControls = JsonFormControl[];
export type JsonData = JsonFormControls | JsonFormControl;
