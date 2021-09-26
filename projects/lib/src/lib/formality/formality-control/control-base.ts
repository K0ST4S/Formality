import { Component, Input } from '@angular/core';
import { ControlUtils } from './../../utils/control-utils';
import {
  FormalityControl,
  SelectSettings,
} from './../formality-data-structures';

@Component({
  selector: 'control-base',
  template: '-',
})
export class ControlBase {
  @Input() control: FormalityControl;
  @Input() parent: FormalityControl;

  public getId(): string {
    return ControlUtils.getId(this.control, this.parent);
  }

  public getSelectSettings(): SelectSettings {
    return this.control.settings as SelectSettings;
  }
}
