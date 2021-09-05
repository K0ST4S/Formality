import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { JsonFormControls, ValueType } from '../nested-json-form.component';
import { JsonFormControl } from './../nested-json-form.component';

@Component({
  selector: 'app-json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class JsonFormComponent implements OnInit {
  ValueType = ValueType;
  @Input() public jsonFormData: JsonFormControls;
  @Input() public parent: JsonFormControl;
  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  getHeaderClass() {
    let depth: number = 0;
    let form: FormGroup | FormArray = this.parentForm.form;
    while (form) {
      form = form.parent;
      depth++;
    }
    return `h${depth}`;
  }
}
