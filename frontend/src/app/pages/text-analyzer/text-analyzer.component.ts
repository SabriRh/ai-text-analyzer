import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyzeService, AnalysisResult } from '../../services/analyze.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-text-analyzer',
  standalone: true,
  imports: [CommonModule, FormsModule, LoaderComponent],
  templateUrl: './text-analyzer.component.html',
  styleUrls: ['./text-analyzer.component.scss']
})
export class TextAnalyzerComponent {
  textInput = '';
  isLoading = false;
  result: AnalysisResult | null = null;
  error: string | null = null;
  healthMsg: string | null = null;
  activeTab: 'corrections' | 'reformulated' | 'optimized' | 'summary' | 'keypoints' = 'corrections';

  constructor(private analyzeService: AnalyzeService) { }

  analyze() {
    if (!this.textInput.trim()) {
      this.error = 'Veuillez saisir un texte.';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.result = null;

    this.analyzeService.analyzeText(this.textInput).subscribe({
      next: (res) => {
        this.result = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors de l\'analyse. Vérifiez que le backend tourne.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  clear() {
    this.textInput = '';
    this.result = null;
    this.error = null;
    this.healthMsg = null;
  }

  checkHealth() {
    this.healthMsg = null;
    this.analyzeService.checkHealth().subscribe({
      next: (res) => {
        if (res.status === 'ok' || res.status === 'degraded') {
          const latency = res.services?.ollama?.latencyMs;
          this.healthMsg = `✅ Service ${res.status} - Latence: ${latency || '?'}ms`;
        } else {
          this.healthMsg = `⚠️ Service: ${res.status}`;
        }
        setTimeout(() => { this.healthMsg = null; }, 5000);
      },
      error: () => {
        this.healthMsg = '❌ Backend indisponible. Vérifie que le backend tourne (npm run dev)';
        setTimeout(() => { this.healthMsg = null; }, 5000);
      }
    });
  }
}