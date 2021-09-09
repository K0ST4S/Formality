import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COUNTRIES } from './country-data/countries';
import { JsonData } from './formality/formality-data-structures';
import { FormalityComponent } from './formality/formality.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  countries = COUNTRIES;
  @ViewChild(FormalityComponent) form: FormalityComponent;
  public formData: JsonData;
  public controlsFormData: JsonData;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get('/assets/my-form.json').subscribe((formData: JsonData) => {
      this.formData = formData;
      this.cdr.detectChanges();
    });

    this.http
      .get('/assets/my-form-controls.json')
      .subscribe((formData: JsonData) => {
        this.controlsFormData = formData;
        this.cdr.detectChanges();
      });
  }

  onSubmit(value: any) {
    console.log(this.form.formGroup);
  }
}
