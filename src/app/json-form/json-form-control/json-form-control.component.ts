import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
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
    [ValueType.Text]: 'form-control',
    [ValueType.Password]: 'form-control',
    [ValueType.Email]: 'form-control',
    [ValueType.Number]: 'form-control',
    [ValueType.Search]: 'form-control',
    [ValueType.Mobile]: 'form-control',
    [ValueType.Url]: 'form-control',
    [ValueType.Textarea]: 'form-control',
    [ValueType.RichText]: '',
    [ValueType.Checkbox]: 'form-check-input order-0',
    [ValueType.Switch]: 'form-check-input order-0',
    [ValueType.Radio]: 'form-check-input order-0',
    [ValueType.Range]: 'custom-range',
    [ValueType.Date]: '',
    [ValueType.Singleselect]: '',
    [ValueType.Multiselect]: '',
    [ValueType.Countryselect]: '',
    [ValueType.File]: 'form-control',
    [ValueType.Image]: 'form-control',
    [ValueType.Form]: 'input-group',
  };

  LabelClass = {
    [ValueType.Text]: 'form-label',
    [ValueType.Password]: 'form-label',
    [ValueType.Email]: 'form-label',
    [ValueType.Number]: 'form-label',
    [ValueType.Search]: 'form-label',
    [ValueType.Mobile]: 'form-label',
    [ValueType.Url]: 'form-label',
    [ValueType.Textarea]: 'form-label',
    [ValueType.RichText]: 'form-label',
    [ValueType.Checkbox]: 'form-check-label order-1',
    [ValueType.Switch]: 'form-check-label order-1',
    [ValueType.Radio]: 'form-check-label order-1',
    [ValueType.Range]: 'form-label',
    [ValueType.Date]: 'form-label',
    [ValueType.Singleselect]: 'form-label',
    [ValueType.Multiselect]: 'form-label',
    [ValueType.Countryselect]: 'form-label',
    [ValueType.File]: 'form-label',
    [ValueType.Image]: 'form-label',
    [ValueType.Form]: 'form-label',
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
    [ValueType.Switch]: 'custom-switch',
    [ValueType.Radio]: 'form-group',
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

  public getControlClass(control: JsonFormControl): string {
    return `${control.name} ${this.ControlClass[control.type]}`;
  }

  public getLabelClass(control: JsonFormControl): string {
    return `${this.LabelClass[control.type]}`;
  }
}
