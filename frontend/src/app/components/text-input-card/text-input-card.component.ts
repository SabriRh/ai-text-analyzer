import { Component, signal, output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-text-input-card',
    imports: [FormsModule, MatButtonModule, MatIcon],
    templateUrl: './text-input-card.component.html',
    styleUrls: ['./text-input-card.component.scss']
})
export class TextInputCardComponent {
  text = signal('');
  analyze = output<string>();
  clear = output<void>();

  onAnalyze() {
    if (this.text().trim()) {
      this.analyze.emit(this.text());
    }
  }

  onClear() {
    this.text.set('');
    this.clear.emit();
  }
}