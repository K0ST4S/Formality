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

export type JsonFormControls = JsonFormControl[];
