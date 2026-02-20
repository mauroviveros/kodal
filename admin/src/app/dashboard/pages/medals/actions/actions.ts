import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmIcon } from '@spartan-ng/helm/icon';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoreHorizontal, lucideQrCode } from '@ng-icons/lucide';
import { Medal } from '@shared/types';
import { generateQR } from '@shared/utils';



@Component({
  selector: 'app-dashboard-medals-actions',
  imports: [HlmDropdownMenuImports, HlmButtonImports, HlmDialogImports, NgIcon, HlmIcon],
  providers: [
    provideIcons({
      lucideMoreHorizontal,
      lucideQrCode
    })
  ],
  templateUrl: './actions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMedalsActions {
  protected readonly medal = input<Medal>();
  readonly QRsrc = signal<string | null>(null);

  constructor() {
    effect(() => {
      const medal = this.medal();
      const url = new URL(`https://kodal.pet/m/${medal?.code}`)

      generateQR(url).then(dataUrl => {
        this.QRsrc.set(dataUrl);
      });
    })
  }

  downloadQR() {
    const qrSrc = this.QRsrc();

    if (!qrSrc) return;

    const link = document.createElement('a');
    link.href = qrSrc;
    link.download = `medal-${this.medal()?.code}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
