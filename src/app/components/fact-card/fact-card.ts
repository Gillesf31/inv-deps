import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FactService } from '../../services/fact.service';

@Component({
  selector: 'app-fact-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (fact.value(); as data) {
      <div class="relative bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full overflow-hidden">
        <div class="absolute -top-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full opacity-60"></div>
        <div class="absolute -bottom-8 -right-8 w-48 h-48 bg-violet-100 rounded-full opacity-50"></div>

        <div class="relative space-y-6">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span class="text-xs font-semibold uppercase tracking-widest text-indigo-400">Useless fact</span>
          </div>

          <p class="text-gray-800 text-xl font-medium leading-relaxed">{{ data.text }}</p>

          <div class="border-t border-gray-100 pt-4 flex items-center justify-between">
            <a
              [href]="data.source_url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-gray-400 hover:text-indigo-500 transition-colors"
            >
              {{ data.source }}
            </a>
            <span class="text-xs font-medium bg-indigo-50 text-indigo-400 px-2 py-1 rounded-full uppercase tracking-wide">
              {{ data.language }}
            </span>
          </div>

          <button
            (click)="fact.reload()"
            class="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold py-3 rounded-2xl transition-all cursor-pointer"
          >
            New fact
          </button>
        </div>
      </div>
    }
  `,
})
export class FactCard {
  private readonly factService = inject(FactService);

  protected readonly fact = rxResource({
    stream: () => this.factService.getRandomFact(),
  });
}
