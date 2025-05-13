import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavigationComponent } from '../../common/components/navigation/navigation.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NavigationComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private user = computed(() => this.authService.user());

  ngOnInit() {
    console.log('user', this.user());
  }
} 