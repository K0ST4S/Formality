import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Form } from 'src/my-form-object';
import { FormalityUtils } from '../../projects/lib/src/lib/utils/formality-utils';
import { FormalityData } from './../../projects/lib/src/lib/formality/formality-data-structures';
import { FormalityComponent } from './../../projects/lib/src/lib/formality/formality.component';

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
