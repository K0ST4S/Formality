import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  UntypedFormControl,
  FormGroupDirective,
} from '@angular/forms';
import { FormalityControl } from '../formality-data-structures';

@Component({
  selector: 'formality-validator',
  templateUrl: './formality-validator.component.html',
  styleUrls: ['./formality-validator.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormalityValidatorComponent implements OnInit {
  @Input() control: FormalityControl;
  public formControl: UntypedFormControl;

  constructor(
    public formDirective: FormGroupDirective,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.formControl = this.formDirective.form.get(
      this.control.name
    ) as UntypedFormControl;

    this.formControl.statusChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  }
}
