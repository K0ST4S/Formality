import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuillModule } from 'ngx-quill';
import { NgBootstrapDatetimeModule } from '../ng-bootstrap-datetime/ng-bootstrap-datetime.module';
import { CountrySelectComponent } from './../country-select/country-select.component';
import { FlagIconComponent } from './../flag-icon/flag-icon.component';
import { RemoveWrapperDirective } from './../utils/remove-wrapper.directive';
import { FormalityControlComponent } from './formality-control/formality-control.component';
import { FormalityFormComponent } from './formality-form/formality-form.component';
import { FormalityValidatorComponent } from './formality-validator/formality-validator.component';
import { FormalityComponent } from './formality.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    FormalityValidatorComponent,
    FormalityControlComponent,
    FormalityFormComponent,
    FormalityComponent,
    RemoveWrapperDirective,
    CountrySelectComponent,
    FlagIconComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    NgbModule,
    NgBootstrapDatetimeModule,
    QuillModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
      useDefaultLang: true,
    }),
    NgSelectModule,
  ],
  exports: [
    FormalityComponent,
    FormalityFormComponent,
    FormalityValidatorComponent,
    FormalityControlComponent,
    CountrySelectComponent,
    FlagIconComponent,
    RemoveWrapperDirective,
  ],
  bootstrap: [],
})
export class FormalityModule {}
