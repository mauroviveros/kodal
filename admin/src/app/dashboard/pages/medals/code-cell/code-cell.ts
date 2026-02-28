import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { generateQR } from '@shared/utils';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-dashboard-medals-code-cell',
  imports: [HlmButtonImports],
  templateUrl: './code-cell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMedalsCodeCell {
  protected readonly code = input<string>();

  async copy() {
    const url = new URL(`https://kodal.pet/m/${this.code()}`);

    const dataUrl = await generateQR(url);
    const response = await fetch(dataUrl);
    const blob = await response.blob();

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ]);

    toast(`base64: ${this.code()}`, {
			description: 'ha sido copiado al portapapeles',
      duration: 3000,
		});
  }
}
