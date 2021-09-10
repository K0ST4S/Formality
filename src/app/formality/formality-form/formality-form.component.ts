import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormComponent implements OnInit {
  ValueType = ValueType;
  @Input() public jsonFormControls: JsonFormControls;
  @Input() public parent: JsonFormControl;
  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  private getControlsClass(): string {
    return `${this.parent?.name}-controls controls`;
  }

  public getHeaderClass() {
    return `h${this.parent?.depth ?? 1}`;
  }

  public getSubFormClass(control: JsonFormControl) {
    return `${control.name}-subform subform`;
  }

  public getGroupClass(): string {
    if (!this.parent) return 'group';
    else if (this.parent?.type === ValueType.Group)
      return `${this.getControlsClass()} group`;
    else return this.getControlsClass();
  }
}
