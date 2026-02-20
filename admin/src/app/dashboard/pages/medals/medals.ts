import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ColumnFiltersState, createAngularTable, flexRenderComponent, FlexRenderDirective, getCoreRowModel, getFilteredRowModel } from '@tanstack/angular-table';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { DatabaseService } from '@core/services/database.service';
import { DashboardMedalsBulkDialog } from './bulk-dialog/bulk-dialog';
import { DashboardMedalsActions } from './actions/actions';



@Component({
  selector: 'app-dashboard-medals',
  imports: [HlmCardImports, HlmTableImports, HlmInputImports, HlmBadgeImports, FlexRenderDirective, DashboardMedalsBulkDialog],
  templateUrl: './medals.html',
  host: {
    class: 'flex flex-1 flex-col gap-4 p-4'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMedals {
  private readonly db = inject(DatabaseService);
  protected columnFilters = signal<ColumnFiltersState>([]);

  protected readonly table = createAngularTable(() => ({
    data: this.db.medal(),
    columns: [
      {
        accessorKey: 'code',
        header: 'Codigo'
      },
      {
        accessorKey: 'status',
        header: 'Estado'
      },
      {
        accessorKey: 'email',
        header: 'Email del dueño',
        cell: info => info.getValue() ?? '-'
      },
      {
        id: 'actions',
        header: 'Acciones',
        cell: (info) => flexRenderComponent(DashboardMedalsActions, {
          inputs: {
            medal: info.row.original
          }
        }),
      }
    ],
    state: {
      columnFilters: this.columnFilters(),
    },
    onColumnFiltersChange: updater => {
      this.columnFilters.set(
        typeof updater === 'function'
          ? updater(this.columnFilters())
          : updater
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  }));

  constructor() {
    effect(() => {
      console.log('Medals data:', this.db.medal());
    });
  }

  protected filterChanged(event: Event) {
		this.table.getColumn('email')?.setFilterValue((event.target as HTMLInputElement).value);
	}
}
