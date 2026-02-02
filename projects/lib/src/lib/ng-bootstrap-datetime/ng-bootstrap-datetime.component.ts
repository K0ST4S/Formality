import { DatePipe } from '@angular/common';
import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    Optional,
    Self,
    ViewChild
} from '@angular/core';
import {
    ControlValueAccessor,
    NgControl
} from '@angular/forms';
import {
    NgbDatepicker,
    NgbDateStruct,
    NgbPopover,
    NgbTimeStruct,
} from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { noop } from 'rxjs';

@Component({
    selector: 'ng-bootstrap-datetime',
    templateUrl: './ng-bootstrap-datetime.component.html',
    styles: [],
    providers: [
        DatePipe
    ],
    standalone: false
})
export class NgBootstrapDatetimeComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input()
  format = 'd/M/yyyy H:mm:ss';
  @Input()
  placeholder: string = '';
  @Input()
  hourStep = 1;
  @Input()
  minuteStep = 15;
  @Input()
  secondStep = 30;
  @Input()
  seconds = true;

  @Input()
  meridian = true;
  @Input()
  disabled = false;

  @ViewChild(NgbDatepicker)
  private dp: NgbDatepicker;

  @ViewChild(NgbPopover)
  public popover: NgbPopover;

  private onTouched: () => void = noop;
  private onChange: (_: any) => void = noop;

  dateStruct: NgbDateStruct;
  timeStruct: NgbTimeStruct;
  date: Date;
  private isWritingValue = false;

  constructor(
    private datePipe: DatePipe,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  writeValue(newModel: string) {
    if (newModel) {
      this.isWritingValue = true;
      try {
        const myDate = moment(newModel).toDate();
        if (myDate && !isNaN(myDate.getTime())) {
          this.date = myDate;
          this.dateStruct = {
            year: myDate.getFullYear(),
            month: myDate.getMonth() + 1,
            day: myDate.getDate(),
          };

          this.timeStruct = {
            hour: myDate.getHours(),
            minute: myDate.getMinutes(),
            second: myDate.getSeconds(),
          };
          // We don't call setDateStringModel here to avoid calling onChange during writeValue
        }
      } finally {
        this.isWritingValue = false;
      }
    } else {
      this.date = null;
      this.dateStruct = null;
      this.timeStruct = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange($event: any) {
    const value = $event.target.value;
    const d = moment(value); // Try to parse what user typed
    if (d.isValid()) {
      this.writeValue(d.toISOString());
      this.setDateStringModel();
    }
  }

  onDateChange(event: NgbDateStruct) {
    this.setDateStringModel();
  }

  onTimeChange(event: NgbTimeStruct) {
    this.setDateStringModel();
  }

  setDateStringModel() {
    if (this.isWritingValue) return;

    if (!this.timeStruct && this.dateStruct) {
      const dateA = new Date();
      this.timeStruct = {
        hour: dateA.getHours(),
        minute: dateA.getMinutes(),
        second: dateA.getSeconds(),
      };
    }

    if (this.dateStruct && this.timeStruct) {
      this.date = new Date(
        this.dateStruct.year,
        this.dateStruct.month - 1,
        this.dateStruct.day,
        this.timeStruct.hour,
        this.timeStruct.minute,
        this.timeStruct.second
      );

      const formattedDate = this.datePipe.transform(this.date, this.format);
      this.onChange(formattedDate);
    }
  }

  inputBlur($event) {
    this.onTouched();
  }
}
