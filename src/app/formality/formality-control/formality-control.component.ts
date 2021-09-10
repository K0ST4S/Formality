import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormGroupDirective,
} from '@angular/forms';
import { FormalityControl, ValueType } from '../formality-data-structures';

@Component({
  selector: 'formality-control',
  templateUrl: './formality-control.component.html',
  styleUrls: ['./formality-control.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonFormControlComponent implements OnInit {
  @Input() control: FormalityControl;
  @Input() parent: FormalityControl;
  ValueType = ValueType;
  ControlClass = {
    [ValueType.Text]: 'form-control order-1',
    [ValueType.Password]: 'form-control order-1',
    [ValueType.Email]: 'form-control order-1',
    [ValueType.Number]: 'form-control order-1',
    [ValueType.Search]: 'form-control order-1',
    [ValueType.Mobile]: 'form-control order-1',
    [ValueType.Url]: 'form-control order-1',
    [ValueType.Textarea]: 'form-control order-1',
    [ValueType.Article]: 'order-1 mb-2',
    [ValueType.Checkbox]: 'form-check-input',
    [ValueType.Switch]: 'form-check-input',
    [ValueType.Radio]: 'form-check-input',
    [ValueType.Range]: 'form-range order-1',
    [ValueType.Date]: 'order-1',
    [ValueType.Select]: 'order-1 mb-2',
    [ValueType.Country]: 'order-1 mb-2',
    [ValueType.File]: 'form-control order-1',
    [ValueType.Image]: 'form-control order-1',
    [ValueType.Form]: 'input-group order-1',
  };

  LabelClass = {
    [ValueType.Text]: 'form-label order-0',
    [ValueType.Password]: 'form-label order-0',
    [ValueType.Email]: 'form-label order-0',
    [ValueType.Number]: 'form-label order-0',
    [ValueType.Search]: 'form-label order-0',
    [ValueType.Mobile]: 'form-label order-0',
    [ValueType.Url]: 'form-label order-0',
    [ValueType.Textarea]: 'form-label order-0',
    [ValueType.Article]: 'form-label order-0',
    [ValueType.Checkbox]: 'form-check-label',
    [ValueType.Switch]: 'form-check-label',
    [ValueType.Radio]: 'form-check-label',
    [ValueType.Range]: 'form-label order-0',
    [ValueType.Date]: 'form-label order-0',
    [ValueType.Select]: 'form-label order-0',
    [ValueType.Country]: 'form-label order-0',
    [ValueType.File]: 'form-label order-0',
    [ValueType.Image]: 'form-label order-0',
    [ValueType.Form]: 'form-label order-0',
  };

  GroupClass = {
    [ValueType.Text]: 'form-group  d-flex flex-column',
    [ValueType.Password]: 'form-group d-flex flex-column',
    [ValueType.Email]: 'form-group d-flex flex-column',
    [ValueType.Number]: 'form-group d-flex flex-column',
    [ValueType.Search]: 'form-group d-flex flex-column',
    [ValueType.Mobile]: 'form-group d-flex flex-column',
    [ValueType.Url]: 'form-group d-flex flex-column',
    [ValueType.Textarea]: 'form-group d-flex flex-column',
    [ValueType.Article]: 'd-flex flex-column',
    [ValueType.Checkbox]: 'form-check',
    [ValueType.Switch]: 'form-switch',
    [ValueType.Radio]: 'form-check',
    [ValueType.Range]: 'form-group d-flex flex-column',
    [ValueType.Date]: 'd-flex flex-column',
    [ValueType.Select]: 'd-flex flex-column',
    [ValueType.Country]: 'd-flex flex-column',
    [ValueType.File]: 'form-group d-flex flex-column',
    [ValueType.Image]: 'form-group d-flex flex-column',
    [ValueType.Form]: 'form-group d-flex flex-column',
  };

  constructor(
    public parentForm: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.parentForm.form.get(this.control.name).setValue(reader.result);

        // need to run CD since file load runs outside of zone
        this.cdr.markForCheck();
      };
    }
  }

  public getControlClass(): string {
    const control: AbstractControl = this.parentForm.form.get(
      this.referenceControl.name
    );

    return `${this.control.name} ${this.ControlClass[this.control.type]} ${
      control.touched
        ? control.invalid
          ? 'is-invalid'
          : control.validator
          ? 'is-valid'
          : ''
        : ''
    }`;
  }

  public getLabelClass(control: FormalityControl): string {
    return `${this.LabelClass[control.type]}`;
  }

  public getGroupClass(control: FormalityControl): string {
    return `${this.GroupClass[control.type]}`;
  }

  public get referenceControl(): FormalityControl {
    if (!this.control && !this.parent) {
      console.log('Both control and parent are null');
    }

    return this.parent?.type === ValueType.RadioGroup
      ? this.parent
      : this.control;
  }
}
