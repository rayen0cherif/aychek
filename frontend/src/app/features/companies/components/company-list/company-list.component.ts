import { Component, inject, OnInit, signal, computed, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {
  private companyService = inject(CompanyService);
  
  companies = signal<Company[]>([]);
  searchQuery = signal('');
  isLoading = signal(true);
  error = signal('');

  @Output() companySelected = new EventEmitter<string>();

  filteredCompanies = computed(() => {
    const q = this.searchQuery().toLowerCase();
    return this.companies().filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.sector.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q)
    );
  });

  ngOnInit() {
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to load companies. Is the backend running?');
        this.isLoading.set(false);
      }
    });
  }
}
