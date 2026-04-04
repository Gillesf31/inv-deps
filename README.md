## Dependency Inversion Principle

This project illustrates the **Dependency Inversion Principle (DIP)**, one of the SOLID principles:

> _High-level modules should not depend on low-level modules. Both should depend on abstractions._

### How it works here

`FactService` is an abstract class acting as the **abstraction layer**. Neither the consumer (`FactCard`) nor the implementations (`FactProductionService`, `FactMockService`) know about each other — they all point to the abstraction.

```
┌─────────────────────────────────────────────────────────────────┐
│                         app.config.ts                           │
│                      (Composition Root)                         │
│                                                                 │
│   provide: FactService  ──►  useClass: FactProductionService    │
│                                        or FactMockService       │
│                         driven by environment.mockServices      │
└──────────────────────────────────┬──────────────────────────────┘
                                   │
          ┌────────────────────────┼───────────────────────┐
          │                        │                       │
          │  HIGH LEVEL            │ ABSTRACTION           │  LOW LEVEL
          ▼                        ▼                       │
┌──────────────────┐   ┌───────────────────────┐           │
│    FactCard      │   │  «abstract»           │           │
│   (Component)    │   │  FactService          │           │
│                  │   │                       │           │
│  inject(         │   │  getRandomFact():     │           │
│    FactService   ├──►│    Observable         │◄──────────┤
│  )               │   │                       │  extends  │
│                  │   └───────────────────────┘           │
│  getRandomFact() │                                       │
└──────────────────┘          ┌────────────────────────────┴──────┐
                              │                                   │
                   ┌──────────┴──────────┐           ┌────────────┴────────┐
                   │ FactProductionSvc   │           │   FactMockSvc       │
                   │                     │           │                     │
                   │ getRandomFact()     │           │ getRandomFact()     │
                   │   → HTTP API call   │           │   → local data      │
                   └─────────────────────┘           └─────────────────────┘
```

### Key points

- **`FactCard`** (high-level) only knows about `FactService` — it never imports a concrete implementation.
- **`FactProductionService`** and **`FactMockService`** (low-level) both `extend` `FactService`, so they also depend on the abstraction, not on each other.
- **`app.config.ts`** is the sole composition root — the only place that decides which implementation to inject, based on `environment.mockServices`.

This means swapping the data source (e.g. replacing the HTTP API with a different backend) requires no changes in `FactCard` — only a new implementation of `FactService` and a one-line change in `app.config.ts`.
