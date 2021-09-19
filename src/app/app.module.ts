import { NgModule } from '@angular/core';
import { FormalityModule } from 'projects/lib/src/lib/formality/formality.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [FormalityModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
