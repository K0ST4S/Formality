import { AbstractControl, ValidationErrors } from '@angular/forms';
export class CustomValidators {
  public static requiredTrue(
    control: AbstractControl
  ): ValidationErrors | null {
    return control.value !== true
      ? {
          requiredTrue: true,
        }
      : null;
  }
}
