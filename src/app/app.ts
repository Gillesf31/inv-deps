import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FactCard } from './components/fact-card/fact-card';

@Component({
  selector: 'app-root',
  imports: [FactCard],
  template: `<div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <app-fact-card />
  </div> `,
})
export class App {}
