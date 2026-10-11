import { Component, input } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

type ResultType = 'text' | 'list' | 'score' | 'sentiment';

@Component({
    selector: 'app-result-section',
    imports: [MatIconModule, MatButtonModule, MatSnackBarModule],
    templateUrl: './result-section.component.html',
    styleUrls: ['./result-section.component.scss']
})
export class ResultSectionComponent {
  title = input<string>('');
  content = input<any>();
  type = input<ResultType>('text');
  icon = input<string | null>(null);
  copyable = input(false);

  readonly sentimentLabels: Record<string, string> = { positif: 'Positif', negatif: 'Négatif', neutre: 'Neutre' };

  percent(): number {
    return Math.round((this.content() ?? 0) * 100);
  }

  constructor(private snackBar: MatSnackBar) { }

  copyText(text: string) {
    navigator.clipboard.writeText(text);
    this.snackBar.open('Copié !', 'Fermer', { duration: 1500 });
  }
}