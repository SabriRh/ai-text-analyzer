import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isDark = signal(false);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.add('light');
    }

    effect(() => {
      const dark = this.isDark();
      if (dark) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  toggleDarkMode() {
    this.isDark.update(value => !value);
  }
}