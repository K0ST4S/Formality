import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-flag-icon',
    templateUrl: './flag-icon.component.html',
    styleUrls: ['./flag-icon.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FlagIconComponent {
  @Input() private country: string;
  @Input() private squared: boolean;

  constructor() {}

  get flagClass(): string {
    return `fi fi-${this.country.toLowerCase()} ${
      this.squared ? 'fis' : ''
    }`;
  }
}
