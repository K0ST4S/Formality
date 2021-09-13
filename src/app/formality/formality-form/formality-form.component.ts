import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import {
  FormalityControl,
  FormalityControls,
  ValueType,
} from '../formality-data-structures';
import { FormalityUtils } from './../../utils/formality-utils';

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
  @Input() public jsonFormControls: FormalityControls;
  @Input() public parent: FormalityControl;
  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  private getControlsClass(): string {
    return `${this.parent?.name}${FormalityUtils.CONTROLS_CLASS_POSTFIX} ${FormalityUtils.CONTROLS_CLASS_POSTFIX}`;
  }

  public getHeaderClass() {
    return `h${this.parent?.depth ?? 1}`;
  }

  public getSubFormClass(control: FormalityControl) {
    return `${control.name}${FormalityUtils.SUBFORM_CLASS_POSTFIX} ${FormalityUtils.SUBFORM_CLASS_POSTFIX}`;
  }

  public getGroupClass(): string {
    if (!this.parent) return FormalityUtils.GROUP_CLASS_POSTFIX;
    else if (this.parent?.type === ValueType.Group)
      return `${this.getControlsClass()} ${FormalityUtils.GROUP_CLASS_POSTFIX}`;
    else return this.getControlsClass();
  }
}
