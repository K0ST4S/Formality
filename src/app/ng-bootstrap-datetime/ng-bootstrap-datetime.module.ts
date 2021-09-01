import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapDatetimeComponent } from './ng-bootstrap-datetime.component';

@NgModule({
  declarations: [NgBootstrapDatetimeComponent],
  imports: [FormsModule, NgbModule, CommonModule, ReactiveFormsModule],
  exports: [NgBootstrapDatetimeComponent],
})
export class NgBootstrapDatetimeModule {}
