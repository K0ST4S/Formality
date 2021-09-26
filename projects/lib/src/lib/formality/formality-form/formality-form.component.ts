import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import {
  CONTROLS_CLASS_POSTFIX,
  GROUP_CLASS_POSTFIX,
  SUBFORM_CLASS_POSTFIX,
} from '../constants';
import {
  FormalityControl,
  FormalityControls,
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
export class FormalityFormComponent implements OnInit {
  ValueType = ValueType;
  @Input() public controls: FormalityControls;
  @Input() public parent: FormalityControl;
  constructor(public parentForm: FormGroupDirective) {}

  ngOnInit(): void {}

  private getControlsClass(): string {
    return `${this.parent?.name}${CONTROLS_CLASS_POSTFIX} ${CONTROLS_CLASS_POSTFIX}`;
  }

  public getHeaderClass() {
    return `h${this.parent?.depth ?? 1}`;
  }

  public getSubFormClass(control: FormalityControl) {
    return `${control.name}${SUBFORM_CLASS_POSTFIX} ${SUBFORM_CLASS_POSTFIX}`;
  }

  public getGroupClass(): string {
    if (!this.parent) return GROUP_CLASS_POSTFIX;
    else if (this.parent?.type === ValueType.Group)
      return `${this.getControlsClass()} ${GROUP_CLASS_POSTFIX}`;
    else return this.getControlsClass();
  }
}
