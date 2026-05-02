import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FactService } from '../../services/fact.service';

@Component({
  selector: 'app-fact-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block w-full max-w-lg',
  },
  template: `
    <div class="relative bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full overflow-hidden">
      <div class="absolute -top-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full opacity-60"></div>
      <div class="absolute -bottom-8 -right-8 w-48 h-48 bg-violet-100 rounded-full opacity-50"></div>

      <div class="relative space-y-6 min-h-[21rem]">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
          <span class="text-xs font-semibold uppercase tracking-widest text-indigo-400">Useless fact</span>
        </div>

        @if (fact.value(); as data) {
          <div class="flex-1">
            <p class="text-gray-800 text-xl font-medium leading-relaxed">{{ data.text }}</p>
          </div>

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
        } @else {
          <div class="flex-1 space-y-4" aria-live="polite" aria-busy="true">
            <div class="space-y-3">
              <div class="h-4 w-full rounded-full bg-indigo-100/70 animate-pulse"></div>
              <div class="h-4 w-11/12 rounded-full bg-indigo-100/70 animate-pulse"></div>
              <div class="h-4 w-4/5 rounded-full bg-indigo-100/70 animate-pulse"></div>
              <div class="h-4 w-full rounded-full bg-indigo-100/70 animate-pulse"></div>
              <div class="h-4 w-10/12 rounded-full bg-indigo-100/70 animate-pulse"></div>
              <div class="h-4 w-3/4 rounded-full bg-indigo-100/70 animate-pulse"></div>
            </div>

            <div class="flex items-center justify-between border-t border-gray-100 pt-4">
              <div class="h-3 w-24 rounded-full bg-gray-100 animate-pulse"></div>
              <div class="h-6 w-16 rounded-full bg-indigo-50 animate-pulse"></div>
            </div>
          </div>
        }

        <button
          (click)="fact.reload()"
          [disabled]="fact.isLoading()"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-wait active:scale-95 text-white text-sm font-semibold py-3 rounded-2xl transition-all cursor-pointer"
        >
          <span class="flex items-center justify-center gap-2">
            @if (fact.isLoading()) {
              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle class="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-90"
                  fill="currentColor"
                  d="M22 12a10 10 0 0 0-10-10v4a6 6 0 0 1 6 6h4Z"
                ></path>
              </svg>
              <span>Loading fact...</span>
            } @else {
              <span>New fact</span>
            }
          </span>
        </button>
      </div>
    </div>
  `,
})
export class FactCard {
  private readonly factService = inject(FactService);

  protected readonly fact = rxResource({
    stream: () => this.factService.getRandomFact(),
  });
}
