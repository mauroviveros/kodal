import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { DatabaseService } from '@core/services/database.service';


@Component({
  selector: 'app-dashboard-medals-bulk-dialog',
  imports: [HlmFormFieldImports, HlmSpinnerImports, HlmDialogImports, HlmButtonImports, HlmInputImports, HlmLabelImports, ReactiveFormsModule],
  templateUrl: './bulk-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMedalsBulkDialog {
  private readonly db = inject(DatabaseService);
  protected readonly quantity = new FormControl(10, {
    validators: [Validators.required, Validators.min(1), Validators.max(100)],
    nonNullable: true
  });
  protected readonly loading = signal(false);

  async onSubmit(event: Event) {
    event.preventDefault();
    if(this.quantity.invalid) return this.quantity.markAsTouched();

    this.loading.set(true);
    const { data, error } = await this.db.insertBulkMedals(this.quantity.value);
    console.log({ data, error });

    this.loading.set(false);
  }
}
