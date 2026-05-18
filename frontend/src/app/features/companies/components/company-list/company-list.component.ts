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
  watchlistIds = this.companyService.watchlistIds;
  showWatchlistOnly = signal(false);

  @Output() companySelected = new EventEmitter<string>();

  filteredCompanies = computed(() => {
    let filtered = this.companies();

    if (this.showWatchlistOnly()) {
      filtered = filtered.filter(c => this.watchlistIds().has(c.id));
    }

    const q = this.searchQuery().toLowerCase();
    if (q) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q)
      );
    }

    return filtered;
  });

  sectorStats = computed(() => {
    const all = this.companies();
    if (!all.length) return [];
    
    const counts = new Map<string, number>();
    for (const c of all) {
      counts.set(c.sector, (counts.get(c.sector) || 0) + 1);
    }
    
    const max = Math.max(...Array.from(counts.values()));
    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        count,
        percentage: (count / max) * 100
      }))
      .sort((a, b) => b.count - a.count);
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
