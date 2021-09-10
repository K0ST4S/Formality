import {
  JsonData,
  JsonFormControls,
  ValueType,
} from './../formality/formality-data-structures';

export class FormalityUtils {
  public static generateScssSnippet(value: JsonData, result = ''): string {
    const controls = Array.isArray(value) ? value : [value];
    for (const node of controls) {
      if (node.type === ValueType.Group || node.type === ValueType.RadioGroup) {
        result += `.${node.name}-subform { .${node.name}-controls { `;
        result = this.generateScssSnippet(node.controls, result);
      } else if (node.type === ValueType.Form) {
        result += `.${node.name}-subform { .${node.name}-controls { `;
        result = this.generateScssSnippet(
          node.value as JsonFormControls,
          result
        );
      } else {
        result += ` .${node.name} { }`;
        continue;
      }
      result += ' } }';
    }
    return result;
  }

  public static checkDataValidity(value: JsonData) {
    const controls = Array.isArray(value) ? value : [value];
    // must be no identical labels between all formalities

    const flattenedControls: JsonFormControls =
      this.flattenJsonElements(controls);

    // check for missing names
    this.checkForMissingNames(flattenedControls);

    // check for identical names
    this.checkForIdenticalNames(flattenedControls);

    // check if types are from ValueType enum and value and controls appropriately
    this.checkForMissingTypes(flattenedControls);

    // groups must have controls and no value. Everything else must have a value
    this.checkForMisplacedProperties(flattenedControls);
  }

  private static flattenJsonElements(
    jsonData: JsonData,
    flattenedControls: JsonFormControls = []
  ): JsonFormControls {
    const controls = Array.isArray(jsonData) ? jsonData : [jsonData];
    for (const formElement of controls) {
      switch (formElement.type) {
        case ValueType.Form:
          this.flattenJsonElements(formElement.value as JsonData);
          break;
        case ValueType.Group:
          this.checkDataValidity(formElement.controls as JsonData);
          break;
        default:
          break;
      }
      flattenedControls.push(formElement);
    }
    return flattenedControls;
  }

  private static checkForMisplacedProperties(
    flattenedControls: JsonFormControls
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

  private static checkForMissingTypes(flattenedControls: JsonFormControls) {
    const ValueTypes: ValueType[] = Object.values(ValueType);
    for (const control of flattenedControls) {
      if (!ValueTypes.includes(control.type as ValueType)) {
        console.error(
          `Control ${control.name} has type ${control.type} that does not exist in ValueType enum.`
        );
      }
    }
  }

  private static checkForMissingNames(flattenedControls: JsonFormControls) {
    for (const control of flattenedControls) {
      if (!control.name) {
        console.error(
          `Control ${control.label} of type ${control.type} has missing name`
        );
      }
    }
  }

  private static checkForIdenticalNames(controls: JsonFormControls) {
    const names = controls.map((v) => v.name);
    const uniqueValues = new Set(names);

    if (uniqueValues.size < controls.length) {
      console.log(
        'Duplicate names ',
        names.filter((v) => !Array.from(uniqueValues).includes(v))
      );
    }
  }
}
