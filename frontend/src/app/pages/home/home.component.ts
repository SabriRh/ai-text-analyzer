import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HealthButtonComponent } from '../../components/health-button/health-button.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ResultCardComponent } from '../../components/result-card/result-card.component';
import { TextInputCardComponent } from '../../components/text-input-card/text-input-card.component';
import { AnalyzeResponse } from '../../models';
import { AnalyzeService } from '../../services/analyze.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TextInputCardComponent,
    ResultCardComponent,
    HealthButtonComponent,
    LoaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private analyzeService = inject(AnalyzeService);

  result = signal<AnalyzeResponse | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  analyzeText(text: string) {
    if (!text?.trim()) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.result.set(null);

    this.analyzeService.analyzeText(text).subscribe({
      next: (res: AnalyzeResponse) => {
        this.result.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Erreur lors de l\'analyse. Vérifiez que le backend tourne.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  clearResults() {
    this.result.set(null);
    this.error.set(null);
  }
}