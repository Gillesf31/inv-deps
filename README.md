# Clean Architecture and Dependency Inversion

This Angular app demonstrates how the **Dependency Inversion Principle** fits inside a small
**clean/hexagonal architecture**.

The UI asks for a random fact through an application use case. The use case depends on a domain
port, and the app composition root decides whether that port is backed by mock data or by the real
HTTP API.

## Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│ app.config.ts                                                        │
│ Composition root                                                     │
│                                                                      │
│ provide: FactRepository                                              │
│ useClass: MockFactRepository or HttpFactRepository                   │
└───────────────────────────────────────┬──────────────────────────────┘
                                        │
┌───────────────────────────────────────┼──────────────────────────────┐
│ Presentation                          │ Application                  │
│                                       │                              │
│ FactCard ───────────────────────────► GetRandomFactUseCase           │
│                                       │                              │
└───────────────────────────────────────┼──────────────────────────────┘
                                        │
                                        ▼
                              ┌────────────────────┐
                              │ Domain             │
                              │                    │
                              │ FactRepository     │
                              │ Fact               │
                              └─────────┬──────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
┌──────────────────────────┐                          ┌──────────────────────────┐
│ Infrastructure adapter   │                          │ Infrastructure adapter   │
│                          │                          │                          │
│ MockFactRepository       │                          │ HttpFactRepository       │
│ local facts + delay      │                          │ HTTP API + DTO mapping   │
└──────────────────────────┘                          └──────────────────────────┘
```

## Layers

- `src/app/facts/domain`: domain model and outbound repository port.
- `src/app/facts/application`: application use case that coordinates the domain port.
- `src/app/facts/infrastructure`: concrete adapters for mock data and the HTTP API.
- `src/app/facts/presentation`: Angular component that renders and reloads facts.

## Dependency Inversion

`GetRandomFactUseCase` depends on the abstract `FactRepository` port:

```ts
export abstract class FactRepository {
  abstract getRandomFact(): Observable<Fact>;
}
```

The UI depends on `GetRandomFactUseCase`, not on a concrete data source. The concrete adapter is
selected only in `app.config.ts`:

```ts
{
  provide: FactRepository,
  useClass: environment.mockServices ? MockFactRepository : HttpFactRepository,
}
```

This keeps business-facing code independent from infrastructure details. Replacing the HTTP API,
adding local storage, or changing mock behavior requires a new adapter and a provider change, not a
presentation or use-case rewrite.

## API Boundary

The domain model uses camelCase names such as `sourceUrl`. The HTTP adapter owns the external DTO
shape and maps the API field `source_url` into the domain model before data reaches the application
or presentation layers.

## Commands

```bash
npm run build
npm test -- --watch=false
```
