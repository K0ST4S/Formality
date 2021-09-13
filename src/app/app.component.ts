import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Form } from 'src/assets/my-form-object';
import { FormalityData } from './formality/formality-data-structures';
import { FormalityComponent } from './formality/formality.component';
import { FormalityUtils } from './utils/formality-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild(FormalityComponent) form: FormalityComponent;
  public exportedObjectFormData = Form;
  public jsonObjectFormData: FormalityData;
  public jsonArrayFormData: FormalityData;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const first = this.http.get('/assets/my-form-object.json');
    const second = this.http.get('/assets/my-form-array.json');

    first.subscribe((formData: FormalityData) => {
      this.jsonObjectFormData = formData;
      FormalityUtils.checkDataValidity(formData);
      this.cdr.detectChanges();
    });

    second.subscribe((formData: FormalityData) => {
      this.jsonArrayFormData = formData;
      FormalityUtils.checkDataValidity(formData);
      this.cdr.detectChanges();
    });

    Promise.all([first.toPromise(), second.toPromise()]).then(() => {
      FormalityUtils.checkForIdenticalNamesAccrossActiveForms();
    });
  }

  onSubmit(value: any) {
    console.log(this.form.formGroup);
  }
}
