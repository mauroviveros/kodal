import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronsUpDown, lucideLogOut } from '@ng-icons/lucide';
import { AuthService } from '@core/services/auth.service';
import { IdentityData } from '@shared/types';

@Component({
  selector: 'app-dashboard-user',
  imports: [HlmSidebarImports, HlmAvatarImports, HlmDropdownMenuImports, NgIcon],
  providers: [
    provideIcons({
      lucideLogOut,
      lucideChevronsUpDown
    })
  ],
  templateUrl: './user.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardUser {
  private readonly auth = inject(AuthService);
  private readonly sidebar = inject(HlmSidebarService);
  protected readonly menuSide = computed(() => (this.sidebar.isMobile() ? 'top' : 'right'));
  protected readonly identity = computed(() => {
    const user = this.auth.user();
      return user?.identities?.[0].identity_data as IdentityData;
  })
}
