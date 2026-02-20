import { Injectable, signal } from '@angular/core';
import { supabase } from '@/supabase';
import { Medal } from '@shared/types';
import { generateNanoID } from '@shared/utils';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  readonly medal = signal<Medal[]>([]);

  constructor(){
    supabase.from('medals').select('*, pet:pets(*)').then(({ data, error }) => {
      this.medal.set(data ?? []);
    });
  }

  insertBulkMedals(quantity: number) {
      const medals = Array.from({ length: quantity }, (_, i) => ({
        id: crypto.randomUUID(),
        code: generateNanoID(),
        status: "CREATED",
        created_at: new Date().toISOString(),
      }));

      return supabase.from('medals').insert(medals).select('id');
  }
}
