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
  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  public getControlClass(control: JsonFormControl): string {
    return `.${control.name}`;
  }
}
