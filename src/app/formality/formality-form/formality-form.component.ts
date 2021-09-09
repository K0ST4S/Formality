import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import {
  JsonFormControl,
  JsonFormControls,
  ValueType,
} from '../formality-data-structures';

@Component({
  selector: 'formality-form',
  templateUrl: './formality-form.component.html',
  styleUrls: ['./formality-form.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class JsonFormComponent implements OnInit {
  ValueType = ValueType;
  @Input() public jsonFormControls: JsonFormControls;
  @Input() public parent: JsonFormControl;
  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  getHeaderClass() {
    return `h${this.parent?.depth ?? 1}`;
  }

  getSubFormClass(control: JsonFormControl) {
    return `${control.name}-subform subform`;
  }

  getControlsClass(): string {
    return `${this.parent?.name}-controls controls`;
  }

  getGroupClass(): string {
    return this.parent?.type === ValueType.Group
      ? `${this.getControlsClass()} group`
      : this.getControlsClass();
  }
}
