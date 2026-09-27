import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnalyzeResponse, HealthResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyzeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  analyzeText(text: string): Observable<AnalyzeResponse> {
    return this.http.post<AnalyzeResponse>(`${this.apiUrl}/analyze`, { text });
  }

  checkHealth(): Observable<HealthResponse> {
    return this.http.get<HealthResponse>(`${this.apiUrl}/health`);
  }
}