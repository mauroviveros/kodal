import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { RouterOutlet } from '@angular/router';
import { DashboardHeader } from './components/header/header';
import { DashboardUser } from './components/user/user';
import { DashboardMenu } from './components/menu/menu';

@Component({
  selector: 'app-dashboard',
  imports: [HlmSidebarImports, DashboardHeader, DashboardUser, DashboardMenu, RouterOutlet],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {}
