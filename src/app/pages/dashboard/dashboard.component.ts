import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { EntryService } from '../../services/entry.service';
import { NavigationComponent } from '../../common/components/navigation/navigation.component';
import { ToastService } from '../../services/toast.service';

interface DashboardSummary {
  fuelUsed: number;
  usageCount: number;
  purchaseCount: number;
  totalCosts: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, NavigationComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private entryService = inject(EntryService);
  private toastService = inject(ToastService);
  private user = computed(() => this.authService.user());

  startDate: string = '';
  endDate: string = '';
  isLoading: boolean = false;

  summary: DashboardSummary = {
    fuelUsed: 0,
    usageCount: 0,
    purchaseCount: 0,
    totalCosts: 0
  };

  ngOnInit() {
    this.initializeDateRange();
    this.loadSummaryData();
  }

  private initializeDateRange() {
    const today = new Date();

    /**
     * TODO: get first entry date from firestore
     */
    const firstEntryDate = new Date(today.getFullYear(), 0, 1);
    
    this.startDate = this.formatDateForInput(firstEntryDate);
    this.endDate = this.formatDateForInput(today);
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  updateDateRange() {
    this.loadSummaryData();
  }

  private loadSummaryData() {
    this.isLoading = true;
    
    this.entryService.getEntries().pipe(
      map(entries => {
        let fuelUsed = 0;
        let usageCount = 0;
        let purchaseCount = 0;
        let totalCosts = 0;

        entries.forEach(entry => {
          if (entry.type === 'fuelUsage') {
            fuelUsed += entry.data.quantity;
            usageCount++;
          } else if (entry.type === 'fuelPurchase') {
            purchaseCount++;
            totalCosts += entry.data.cost;
          }
        });

        return {
          fuelUsed,
          usageCount,
          purchaseCount,
          totalCosts
        };
      })
    ).subscribe({
      next: (data) => {
        this.summary = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastService.error('Błąd podczas ładowania danych');
        this.summary = {
          fuelUsed: 0,
          usageCount: 0,
          purchaseCount: 0,
          totalCosts: 0
        };
        this.isLoading = false;
      }
    });
  }
} 