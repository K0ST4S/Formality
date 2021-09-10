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
}
