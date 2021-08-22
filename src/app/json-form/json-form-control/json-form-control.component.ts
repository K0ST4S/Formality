import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroupDirective,
} from '@angular/forms';
import { JsonFormControl, ValueType } from './../nested-json-form.component';

@Component({
  selector: 'app-json-form-control',
  templateUrl: './json-form-control.component.html',
  styleUrls: ['./json-form-control.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class JsonFormControlComponent implements OnInit {
  @Input() control: JsonFormControl;
  ValueType = ValueType;
  ControlClass = {
    [ValueType.Text]: 'form-control order-1',
    [ValueType.Password]: 'form-control order-1',
    [ValueType.Email]: 'form-control order-1',
    [ValueType.Number]: 'form-control order-1',
    [ValueType.Search]: 'form-control order-1',
    [ValueType.Mobile]: 'form-control order-1',
    [ValueType.Url]: 'form-control order-1',
    [ValueType.Textarea]: 'form-control order-1',
    [ValueType.RichText]: ' order-1',
    [ValueType.Checkbox]: 'form-check-input',
    [ValueType.Switch]: 'form-check-input',
    [ValueType.Radio]: 'form-check-input',
    [ValueType.Range]: 'custom-range order-1',
    [ValueType.Date]: ' order-1',
    [ValueType.Singleselect]: ' order-1',
    [ValueType.Multiselect]: ' order-1',
    [ValueType.Countryselect]: ' order-1',
    [ValueType.File]: 'form-control order-1',
    [ValueType.Image]: 'form-control order-1',
    [ValueType.Form]: 'input-group order-1',
  };

  LabelClass = {
    [ValueType.Text]: 'form-label order-0',
    [ValueType.Password]: 'form-label order-0',
    [ValueType.Email]: 'form-label order-0',
    [ValueType.Number]: 'form-label order-0',
    [ValueType.Search]: 'form-label order-0',
    [ValueType.Mobile]: 'form-label order-0',
    [ValueType.Url]: 'form-label order-0',
    [ValueType.Textarea]: 'form-label order-0',
    [ValueType.RichText]: 'form-label order-0',
    [ValueType.Checkbox]: 'form-check-label',
    [ValueType.Switch]: 'form-check-label',
    [ValueType.Radio]: 'form-check-label',
    [ValueType.Range]: 'form-label order-0',
    [ValueType.Date]: 'form-label order-0',
    [ValueType.Singleselect]: 'form-label order-0',
    [ValueType.Multiselect]: 'form-label order-0',
    [ValueType.Countryselect]: 'form-label order-0',
    [ValueType.File]: 'form-label order-0',
    [ValueType.Image]: 'form-label order-0',
    [ValueType.Form]: 'form-label order-0',
  };

  GroupClass = {
    [ValueType.Text]: 'form-group',
    [ValueType.Password]: 'form-group',
    [ValueType.Email]: 'form-group',
    [ValueType.Number]: 'form-group',
    [ValueType.Search]: 'form-group',
    [ValueType.Mobile]: 'form-group',
    [ValueType.Url]: 'form-group',
    [ValueType.Textarea]: 'form-group',
    [ValueType.RichText]: 'form-group',
    [ValueType.Checkbox]: 'form-check d-flex flex-row',
    [ValueType.Switch]: 'form-check form-switch  d-flex flex-row',
    [ValueType.Radio]: 'form-group d-flex flex-row',
    [ValueType.Range]: 'form-group',
    [ValueType.Date]: 'form-group',
    [ValueType.Singleselect]: 'form-group',
    [ValueType.Multiselect]: 'form-group',
    [ValueType.Countryselect]: 'form-group',
    [ValueType.File]: 'form-group',
    [ValueType.Image]: 'form-group',
    [ValueType.Form]: 'form-group',
  };

  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  public getControlClass(data: JsonFormControl): string {
    const control: AbstractControl = this.parentForm.form.get(data.name);
    return `${data.name} ${this.ControlClass[data.type]} ${
      control.touched
        ? control.invalid
          ? 'is-invalid'
          : control.validator
          ? 'is-valid'
          : ''
        : ''
    }`;
  }

  public getLabelClass(control: JsonFormControl): string {
    return `${this.LabelClass[control.type]}`;
  }

  public getGroupClass(control: JsonFormControl): string {
    return `${this.GroupClass[control.type]} d-flex flex-column`;
  }
}
