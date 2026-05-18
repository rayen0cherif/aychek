import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, AskResponse } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/companies';

  watchlistIds = signal<Set<string>>(new Set(this.loadWatchlist()));

  private loadWatchlist(): string[] {
    try {
      return JSON.parse(localStorage.getItem('aychek_watchlist') || '[]');
    } catch {
      return [];
    }
  }

  toggleWatchlist(id: string) {
    const current = new Set(this.watchlistIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.watchlistIds.set(current);
    localStorage.setItem('aychek_watchlist', JSON.stringify(Array.from(current)));
  }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`);
  }

  askQuestion(id: string, question: string): Observable<AskResponse> {
    return this.http.post<AskResponse>(`${this.apiUrl}/${id}/ask`, { question });
  }
}
