import { ComponentFixture, TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { GetRandomFactUseCase } from '../../application/get-random-fact.use-case';
import { FactCard } from './fact-card';

describe('FactCard', () => {
  let fixture: ComponentFixture<FactCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactCard],
      providers: [
        {
          provide: GetRandomFactUseCase,
          useValue: {
            execute: vi.fn(() => throwError(() => new Error('Service unavailable'))),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FactCard);
  });

  it('shows an error state when a fact cannot be loaded', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('[role="alert"]')?.textContent).toContain('Unable to load a fact.');
    expect(host.querySelector('button')?.textContent).toContain('Try again');
  });
});
