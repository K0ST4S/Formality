import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin, Observable, shareReplay, tap } from 'rxjs';

// Import your library module or standalone component.
// If the package exports a module, use that.
// Otherwise import the component itself.

import { FormalityModule } from 'projects/lib/src/lib/formality/formality.module';
import { FormalityUtils, SnippetType } from '../../projects/lib/src/lib/utils/formality-utils';

type DemoKey = 'basic' | 'nested' | 'arrayRoot';

interface DemoForm {
  key: DemoKey;
  title: string;
  description: string;
  assetPath: string;
  elementId: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormalityModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  demos: DemoForm[] = [
    {
      key: 'basic',
      title: 'Basic form',
      description: 'Small schema: text + switch + date with validators.',
      assetPath: '/assets/form-basic.json',
      elementId: 'demo-basic',
    },
    {
      key: 'nested',
      title: 'Nested groups & rich controls',
      description: 'Groups, radioGroup, select/country, file, article, and nested forms.',
      assetPath: '/assets/form-nested.json',
      elementId: 'demo-nested',
    },
    {
      key: 'arrayRoot',
      title: 'Array root',
      description: 'Root value is an array of controls.',
      assetPath: '/assets/form-array-root.json',
      elementId: 'demo-array',
    },
  ];

  active: DemoKey = 'basic';
  lastSubmit: Partial<Record<DemoKey, unknown>> = {};
  scssSnippet: Partial<Record<DemoKey, string>> = {};

  demoData$: Observable<Record<DemoKey, unknown>> = forkJoin({
    basic: this.http.get('/assets/form-basic.json'),
    nested: this.http.get('/assets/form-nested.json'),
    arrayRoot: this.http.get('/assets/form-array-root.json'),
  }).pipe(
    tap((all) => {
      for (const d of this.demos) {
        const data = all[d.key];
        FormalityUtils.checkDataValidity(data as any);
        this.scssSnippet[d.key] = FormalityUtils.generateScssSnippet(
          data as any,
          SnippetType.Specific
        );
      }
      FormalityUtils.checkForIdenticalNamesAccrossActiveForms();
    }),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  setActive(key: DemoKey) {
    this.active = key;
  }

  onSubmitted(key: DemoKey, value: unknown) {
    this.lastSubmit[key] = value;
  }

  pickActive(all: Record<DemoKey, unknown>) {
    return all[this.active];
  }

  pickDemoMeta() {
    return this.demos.find((d) => d.key === this.active)!;
  }
}
