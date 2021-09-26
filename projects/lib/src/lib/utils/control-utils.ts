import { FormalityControl } from '../formality/formality-data-structures';

export class ControlUtils {
  public static getId(
    control: FormalityControl,
    parent: FormalityControl
  ): string {
    return parent?.name ? parent.name + control.name : control.name;
  }
}
