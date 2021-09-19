import {
  ControlParent,
  FormalityControl,
  FormalityControls,
  FormalityData,
  ValueType,
} from '../formality/formality-data-structures';
import { FormalityComponent } from './../formality/formality.component';

export class FormalityUtils {
  public static Instances: Set<FormalityComponent> = new Set();
  public static readonly CONTROLS_CLASS_POSTFIX: string = 'controls';
  public static readonly SUBFORM_CLASS_POSTFIX: string = 'subform';
  public static readonly GROUP_CLASS_POSTFIX: string = 'group';

  public static generateScssSnippet(value: FormalityData, result = ''): string {
    const controls = Array.isArray(value) ? value : [value];
    for (const node of controls) {
      if (node.type === ValueType.Group || node.type === ValueType.RadioGroup) {
        result += getGroupNodeLine(node);
        result = this.generateScssSnippet(node.controls, result);
      } else if (node.type === ValueType.Form) {
        result += getGroupNodeLine(node);
        result = this.generateScssSnippet(
          node.value as FormalityControls,
          result
        );
      } else {
        result += ` .${node.name} { }`;
        continue;
      }
      result += ' } }';
    }
    return result;

    function getGroupNodeLine(node: FormalityControl) {
      return `.${node.name}${this.SUBFORM_CLASS_POSTFIX} { .${node.name}${this.CONTROLS_CLASS_POSTFIX} { `;
    }
  }

  public static checkDataValidity(value: FormalityData) {
    const controls = Array.isArray(value) ? value : [value];
    // check for identical names
    const flattenedControls: FormalityControls =
      this.flattenJsonElements(controls);

    // check for missing names
    this.checkForMissingNames(flattenedControls);

    // must be no identical labels between all formalities
    this.checkForIdenticalNames(this.mapToParentChildControls(controls));

    // check if types are from ValueType enum and value and controls appropriately
    this.checkForMissingTypes(flattenedControls);

    // groups must have controls and no value. Everything else must have a value
    this.checkForMisplacedProperties(flattenedControls);
  }

  private static flattenJsonElements(
    jsonData: FormalityData,
    flattenedControls: FormalityControls = []
  ): FormalityControls {
    const controls = Array.isArray(jsonData) ? jsonData : [jsonData];
    for (const control of controls) {
      switch (control.type) {
        case ValueType.Form:
          this.flattenJsonElements(
            control.value as FormalityData,
            flattenedControls
          );
          break;
        case ValueType.Group:
          this.flattenJsonElements(
            control.controls as FormalityData,
            flattenedControls
          );
          break;
        default:
          break;
      }
      flattenedControls.push(control);
    }
    return flattenedControls;
  }

  private static mapToParentChildControls(
    jsonData: FormalityData,
    parent: FormalityControl = null,
    flattenedControls: ControlParent[] = []
  ): ControlParent[] {
    const controls = Array.isArray(jsonData) ? jsonData : [jsonData];
    for (const control of controls) {
      switch (control.type) {
        case ValueType.Form:
          this.mapToParentChildControls(
            control.value as FormalityData,
            control,
            flattenedControls
          );
          break;
        case ValueType.Group:
          this.mapToParentChildControls(
            control.controls as FormalityData,
            control,
            flattenedControls
          );
          break;
        default:
          break;
      }
      flattenedControls.push({
        control: control,
        parent: parent,
      });
    }
    return flattenedControls;
  }

  private static checkForMisplacedProperties(
    flattenedControls: FormalityControls
  ) {
    for (const control of flattenedControls) {
      const controls = control.controls !== undefined;
      const value = control.value !== undefined;
      switch (control.type) {
        case ValueType.Group:
          if (value) {
            console.error(`Group ${control.name} has value property.`);
          }
          if (!controls) {
            console.error(`Group ${control.name} is missing controls`);
          }
          break;
        case ValueType.RadioGroup:
          if (!value || !controls) {
            console.error(
              `RadioGroup ${control.name} must have both value and controls.`
            );
          }
          break;
        default:
          if (!value) {
            console.error(
              `Control ${control.name} of type ${control.type} must have a value property.`
            );
          }
          break;
      }
    }
  }

  private static checkForMissingTypes(flattenedControls: FormalityControls) {
    const ValueTypes: ValueType[] = Object.values(ValueType);
    for (const control of flattenedControls) {
      if (!ValueTypes.includes(control.type as ValueType)) {
        console.error(
          `Control ${control.name} has type ${control.type} that does not exist in ValueType enum.`
        );
      }
    }
  }

  private static checkForMissingNames(flattenedControls: FormalityControls) {
    for (const control of flattenedControls) {
      if (!control.name) {
        console.error(
          `Control ${control.label} of type ${control.type} has missing name`
        );
      }
    }
  }

  private static checkForIdenticalNames(
    pairs: ControlParent[],
    message: string = 'Duplicate names'
  ) {
    const names = pairs.map((pair) => this.getId(pair.control, pair.parent));

    const uniqueValues = new Set(names);

    if (uniqueValues.size < names.length) {
      console.warn(
        message,
        names.filter((e, i, a) => a.indexOf(e) !== i)
      );
    }
  }

  public static checkForIdenticalNamesAccrossActiveForms() {
    let controls: ControlParent[] = [];
    for (const instance of this.Instances) {
      const instanceControls: ControlParent[] = this.mapToParentChildControls(
        instance.controls
      );
      controls = controls.concat(instanceControls);
    }

    this.checkForIdenticalNames(
      controls,
      'Duplicate names within active Formality instances'
    );
  }

  public static getId(
    control: FormalityControl,
    parent: FormalityControl
  ): string {
    return parent?.name ? parent.name + control.name : control.name;
  }
}
