import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, AskResponse } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/companies';

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
