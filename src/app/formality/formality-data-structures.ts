export interface FormalityValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minlength?: boolean;
  maxlength?: boolean;
}

export interface FormalityControl {
  name: string;
  label: string;
  value:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | FormalityControls;
  type: string;
  settings?: RangeOptions & SelectSettings;
  options?: string[] | number[];
  validators: FormalityValidators;
  controls?: FormalityControls;
  depth?: number;
}

export interface RangeOptions {
  min?: string;
  max?: string;
  step?: string;
}

export interface SelectSettings {
  multiple?: boolean;
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

export type FormalityControls = FormalityControl[];
export type FormalityData = FormalityControls | FormalityControl;
