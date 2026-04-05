import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="loader-overlay" [class.transparent]="transparent">
      <div class="wave-loader">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60">
          <path fill="none" stroke="#6366f1" stroke-width="4" stroke-linecap="round"
                d="M0,30 C10,10 20,50 40,30 C60,10 70,50 80,30">
            <animate attributeName="d" dur="1.5s" repeatCount="indefinite"
                     values="M0,30 C10,10 20,50 40,30 C60,10 70,50 80,30;
                             M0,30 C10,50 20,10 40,30 C60,50 70,10 80,30;
                             M0,30 C10,10 20,50 40,30 C60,10 70,50 80,30"/>
          </path>
        </svg>
        <p>Analyse en cours...</p>
      </div>
    </div>
  `,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() transparent = false;
}