import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../utils/custom-validators';
import {
  FormalityControl,
  FormalityControls,
  FormalityData,
  ValidatorType,
  ValueType,
} from './formality-data-structures';

@Component({
  selector: 'formality',
  templateUrl: './formality.component.html',
  styleUrls: ['./formality.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormalityComponent implements OnDestroy {
  public static Instances: FormalityComponent[] = [];
  @Output() onSubmitted: EventEmitter<any> = new EventEmitter();
  public ValueType = ValueType;
  public formGroup: FormGroup = new FormGroup({});

  public controls: FormalityControls;
  @Input() set formData(value: FormalityData) {
    if (!value) {
      return;
    }

    this.controls = Array.isArray(value) ? value : [value];
    this.formGroup = this.parseDataControls(this.controls);

    this.formGroup.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  constructor() {
    FormalityComponent.Instances.push(this);
  }

  ngOnDestroy(): void {
    FormalityComponent.Instances.remove(this);
  }

  parseDataControls(
    jsonFormData: FormalityControls,
    formGroup: FormGroup = null,
    depth: number = 1
  ): FormGroup {
    if (!jsonFormData) {
      return null;
    }

    if (!formGroup) formGroup = new FormGroup({});

    for (const formElement of jsonFormData) {
      this.parseControl(formElement, depth, formGroup);
    }

    return formGroup;
  }

  private parseControl(
    formElement: FormalityControl,
    depth: number = 1,
    formGroup: FormGroup = null
  ): FormGroup {
    if (!formElement) {
      return null;
    }

    formElement.depth = depth + 1;
    let newControl: AbstractControl = null;

    switch (formElement.type) {
      case ValueType.Form:
        const jsonFormGroup = formElement as FormalityControl;
        newControl = this.parseDataControls(
          jsonFormGroup.value as FormalityControls,
          null,
          depth + 1
        );

        formGroup.addControl(formElement.name, newControl);
        break;
      case ValueType.Group:
        this.parseDataControls(
          formElement.controls as FormalityControls,
          formGroup,
          depth + 1
        );
        break;
      default:
        newControl = this.parseControlValidators(
          formElement as FormalityControl
        );
        formGroup.addControl(formElement.name, newControl);
        break;
    }

    return formGroup;
  }

  private parseControlValidators(control: FormalityControl): FormControl {
    const validatorsToAdd: ValidatorFn[] = [];
    if (control.validators) {
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case ValidatorType.Min:
            validatorsToAdd.push(Validators.min(value));
            break;
          case ValidatorType.Max:
            validatorsToAdd.push(Validators.max(value));
            break;
          case ValidatorType.Required:
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case ValidatorType.RequiredTrue:
            if (value) {
              validatorsToAdd.push(CustomValidators.requiredTrue);
            }
            break;
          case ValidatorType.Email:
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case ValidatorType.MinLength:
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case ValidatorType.MaxLength:
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          default:
            break;
        }
      }
    }
    return new FormControl(control.value, validatorsToAdd);
  }

  onSubmit() {
    console.log(this.formGroup.value);
    this.onSubmitted.emit(this.formGroup.value);
    this.formGroup.markAsPristine();
  }
}
