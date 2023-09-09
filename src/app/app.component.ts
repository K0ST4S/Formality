import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  public firstData: FormalityData;
  public secondData: FormalityData;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const first = this.http.get('/assets/test1.json');
    const second = this.http.get('/assets/my-form-object.json');

    first.subscribe((formData: FormalityData) => {
      this.secondData = formData;
      FormalityUtils.checkDataValidity(formData);
      this.cdr.detectChanges();
    });

    second.subscribe((formData: FormalityData) => {
      this.firstData = formData;
      FormalityUtils.checkDataValidity(formData);
      this.cdr.detectChanges();
    });

    Promise.all([first.toPromise(), second.toPromise()]).then(() => {
      FormalityUtils.checkForIdenticalNamesAccrossActiveForms();
    });
  }

  onSubmit(value: any) {
    console.log(value);
  }
}
