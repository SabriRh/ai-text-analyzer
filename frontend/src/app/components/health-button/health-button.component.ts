import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AnalyzeService } from '../../services/analyze.service';
import { HealthResponse } from '../../models';

@Component({
  selector: 'app-health-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './health-button.component.html',
  styleUrls: ['./health-button.component.scss']
})
export class HealthButtonComponent {
  private analyzeService = inject(AnalyzeService);
  private snackBar = inject(MatSnackBar);

  isChecking = signal(false);

  checkHealth() {
    if (this.isChecking()) return;
    this.isChecking.set(true);
    this.analyzeService.checkHealth().subscribe({
      next: (res: HealthResponse) => {
        const msg = res.status === 'ok'
          ? '✅ Service OK - Ollama disponible - Latence: ' + res.services.ollama.latencyMs + ' ms'
          : `⚠️ ${res.status}`;
        this.isChecking.set(false);
        this.snackBar.open(msg, 'Fermer', { duration: 3000 });
      },
      error: () => {
        this.isChecking.set(false);
        this.snackBar.open('❌ Serveur indisponible', 'Fermer', { duration: 3000 });
      }
    });
  }
}