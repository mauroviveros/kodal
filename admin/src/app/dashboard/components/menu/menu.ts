import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLayoutDashboard, lucideMedal } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-dashboard-menu',
  imports: [HlmSidebarImports, NgIcon, RouterLink],
  providers: [
    provideIcons({
      lucideLayoutDashboard,
      lucideMedal
    })
  ],
  templateUrl: './menu.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMenu {
  protected readonly items = [
    {
      title: 'Inicio',
      url: '/dashboard',
      icon: 'lucideLayoutDashboard',
    },
    {
      title: 'Medallas',
      url: '/dashboard/medals',
      icon: 'lucideMedal',
    }
  ]
}
