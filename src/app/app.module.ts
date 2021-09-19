import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormalityModule } from './formality/formality.module';

@NgModule({
  declarations: [AppComponent],
  imports: [FormalityModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
