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
  isDark = signal(localStorage.getItem('theme') === 'dark');

  private themeEffect = effect(() => {
    const dark = this.isDark();
    const html = document.documentElement;
    html.classList.toggle('dark', dark);
    html.classList.toggle('light', !dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });

  toggleDarkMode() {
    this.isDark.update(value => !value);
  }
}