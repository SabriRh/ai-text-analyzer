import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnalysisResult {
  original: string;
  detectedLanguage: string;
  corrections: string[];
  reformulated: string;
  optimized: string;
  summary: string;
  key_points: string[];
  sentiment: 'positif' | 'negatif' | 'neutre';
  score: number;
  language: string;
}

@Injectable({ providedIn: 'root' })
export class AnalyzeService {
  private apiUrl = 'http://localhost:3000'; // Backend local

  constructor(private http: HttpClient) { }

  analyzeText(text: string): Observable<AnalysisResult> {
    return this.http.post<AnalysisResult>(`${this.apiUrl}/analyze`, { text });
  }

  checkHealth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }
}