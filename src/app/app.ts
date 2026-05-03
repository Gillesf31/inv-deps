import { Component } from '@angular/core';
import { FactCard } from './facts/presentation/fact-card/fact-card';

@Component({
  selector: 'app-root',
  imports: [FactCard],
  template: `<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <app-fact-card />
  </div> `,
})
export class App {}
