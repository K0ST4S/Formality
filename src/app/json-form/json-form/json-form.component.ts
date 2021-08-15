import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { JsonFormData, ValueType } from '../nested-json-form.component';

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
  @Input() public jsonFormData: JsonFormData;
  constructor(public parentForm: FormGroupDirective) {
    console.log(parentForm);
  }

  ngOnInit(): void {}
}
