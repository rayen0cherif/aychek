import { Component, EventEmitter, Input, Output, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {
  @Input() companyId!: string;
  @Output() back = new EventEmitter<void>();

  companyService = inject(CompanyService);

  company = signal<Company | null>(null);
  isLoading = signal(true);
  error = signal('');
  watchlistIds = this.companyService.watchlistIds;

  question = signal('');
  aiResponse = signal('');
  isAiLoading = signal(false);
  aiError = signal('');

  ngOnInit() {
    this.companyService.getCompany(this.companyId).subscribe({
      next: (data) => {
        this.company.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to load company details.');
        this.isLoading.set(false);
      }
    });
  }

  ask() {
    const q = this.question().trim();
    if (!q || this.isAiLoading()) return;

    this.question.set('');
    this.isAiLoading.set(true);
    this.aiResponse.set('');
    this.aiError.set('');

    this.companyService.askQuestion(this.companyId, q).subscribe({
      next: (res) => {
        this.aiResponse.set(res.answer);
        this.isAiLoading.set(false);
      },
      error: () => {
        this.aiError.set('Something went wrong. Please try again.');
        this.isAiLoading.set(false);
      }
    });
  }
}
