import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultSectionComponent } from '../result-section/result-section.component';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-result-card',
  standalone: true,
  imports: [CommonModule, ResultSectionComponent, MatIcon],
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent {
  result = input<any>(null);
}