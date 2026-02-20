import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

@Component({
  selector: 'app-detail-dialog',
  imports: [HlmDialogImports, HlmButtonImports],
  templateUrl: './detail-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailDialog {

}
