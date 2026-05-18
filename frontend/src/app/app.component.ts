import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './features/companies/components/company-list/company-list.component';
import { CompanyDetailComponent } from './features/companies/components/company-detail/company-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CompanyListComponent, CompanyDetailComponent],
  template: `
    

    <main class="min-h-[calc(100vh-3.5rem)]">
      <app-company-list 
        *ngIf="!selectedCompanyId()" 
        (companySelected)="onCompanySelect($event)">
      </app-company-list>
      
      <app-company-detail 
        *ngIf="selectedCompanyId()" 
        [companyId]="selectedCompanyId()!" 
        (back)="onBack()">
      </app-company-detail>
    </main>
  `
})
export class AppComponent {
  selectedCompanyId = signal<string | null>(null);

  onCompanySelect(id: string) {
    this.selectedCompanyId.set(id);
  }

  onBack() {
    this.selectedCompanyId.set(null);
  }
}
