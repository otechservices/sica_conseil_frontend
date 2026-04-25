import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../utils/config-service';

export interface SimulatorQuestion {
  id: number;
  domain: 'personnes' | 'processus' | 'environnement';
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  question: string;
  options: string[];
  correct_answer: number | null;
  explanation: string | null;
  selected_answer: number | null;
  is_correct: boolean | null;
}

export interface SimulatorSession {
  id: number;
  mode: 'complet' | 'entrainement' | 'rapide' | 'domaine';
  mode_label: string;
  domain: string | null;
  total_questions: number;
  time_limit: number;
  time_used: number | null;
  score: number | null;
  correct_count: number | null;
  status: 'pending' | 'in_progress' | 'completed' | 'abandoned';
  status_label: string;
  started_at: string | null;
  completed_at: string | null;
  questions?: SimulatorQuestion[];
}

export interface SimulatorStats {
  total_sessions: number;
  avg_score: number;
  best_score: number;
  total_time_seconds: number;
  success_rate: number;
  success_count: number;
  domain_scores: { domain: string; name: string; score: number; questions: number }[];
  recent_sessions: SimulatorSession[];
}

@Injectable({ providedIn: 'root' })
export class SimulatorService {
  private base = ConfigService.toFile('');

  constructor(private http: HttpClient) {}

  startSession(mode: string, domain?: string): Observable<any> {
    return this.http.post<any>(`${this.base}api/simulator/sessions`, { mode, domain });
  }

  getSession(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}api/simulator/sessions/${id}`);
  }

  submitSession(id: number, answers: Record<number, number>, timeUsed: number): Observable<any> {
    return this.http.post<any>(`${this.base}api/simulator/sessions/${id}/submit`, {
      answers,
      time_used: timeUsed,
    });
  }

  abandonSession(id: number): Observable<any> {
    return this.http.post<any>(`${this.base}api/simulator/sessions/${id}/abandon`, {});
  }

  getSessions(mode?: string): Observable<any> {
    const params = mode ? `?mode=${mode}` : '';
    return this.http.get<any>(`${this.base}api/simulator/sessions${params}`);
  }

  getStats(): Observable<any> {
    return this.http.get<any>(`${this.base}api/simulator/stats`);
  }
}
