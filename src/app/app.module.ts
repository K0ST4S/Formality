import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { QuillModule } from 'ngx-quill';
import { AppComponent } from './app.component';
import { CountrySelectComponent } from './country-select/country-select.component';
import { FlagIconComponent } from './flag-icon/flag-icon.component';
import { FormalityControlComponent } from './formality/formality-control/formality-control.component';
import { JsonFormComponent } from './formality/formality-form/formality-form.component';
import { FormalityValidatorComponent } from './formality/formality-validator/formality-validator.component';
import { FormalityComponent } from './formality/formality.component';
import { DateInterceptor } from './interceptors/date.interceptor';
import { NgBootstrapDatetimeModule } from './ng-bootstrap-datetime/ng-bootstrap-datetime.module';
import { RemoveWrapperDirective } from './utils/remove-wrapper.directive';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    JsonFormComponent,
    FormalityValidatorComponent,
    FormalityControlComponent,
    FormalityComponent,
    RemoveWrapperDirective,
    CountrySelectComponent,
    FlagIconComponent,
  ],
  imports: [
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
