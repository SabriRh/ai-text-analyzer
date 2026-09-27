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

  constructor(private snackBar: MatSnackBar) { }

  copyText(text: string) {
    navigator.clipboard.writeText(text);
    this.snackBar.open('Copié !', 'Fermer', { duration: 1500 });
  }
}