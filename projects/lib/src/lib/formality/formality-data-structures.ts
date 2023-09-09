export interface FormalityValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minlength?: boolean;
  maxlength?: boolean;
}

type FormalityControlValue =
  | string
  | string[]
  | number
  | number[]
  | boolean
  | boolean[]
  | File
  | FormalityControls;

export interface FormalityControl {
  name: string;
  label: string;
  value?: any;
  type: string;
  settings?: FormalityControlSettings;
  options?: string[] | number[];
  validators?: FormalityValidators;
  controls?: FormalityControls;
  depth?: number;
}

export type FormalityControlSettings =
  | RangeOptions
  | SelectSettings
  | DateSettings;

export interface RangeOptions {
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectSettings {
  multiple?: boolean;
}

export interface DateSettings {
  format?: string;
  date?: {};
  time?: {
    seconds?: boolean;
    meridian?: boolean;
  };
}

export interface ControlParent {
  control: FormalityControl;
  parent: FormalityControl;
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
  FileList = 'fileList',
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

export class ImageSnippet {
  constructor(public name: string, public base64: string, public file: File) {}
}

export type FormalityControls = FormalityControl[];
export type FormalityData = FormalityControls | FormalityControl;
