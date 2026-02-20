import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmBreadCrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-dashboard-header',
  imports: [HlmSidebarImports, HlmSeparatorImports, HlmBreadCrumbImports],
  templateUrl: './header.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeader {}
