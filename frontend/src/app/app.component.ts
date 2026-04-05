import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextAnalyzerComponent } from "./pages/text-analyzer/text-analyzer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TextAnalyzerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
