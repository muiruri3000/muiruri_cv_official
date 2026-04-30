export type SampleArticle = {
  id: number;
  title: string;
  excerpt: string;
  description: string;
  body: string;
  tags: string;
  slug: string;
  created_at: string;
};

export const sampleArticles: SampleArticle[] = [
  {
    id: 1001,
    title: "Designing Scalable APIs with Django REST Framework",
    excerpt: "Patterns and pitfalls when building production-grade REST APIs.",
    description:
      "A practical walkthrough of structuring DRF projects for scale: serializers, viewsets, pagination, throttling, and authentication.",
    body: `When your API starts serving real traffic, small design choices compound quickly. In this article I share the patterns I've used to keep Django REST Framework projects fast, predictable, and pleasant to maintain.

1. Keep serializers thin
Serializers should validate and shape data — not run business logic. Push domain rules into services or model methods so the same logic can be reused from management commands, Celery tasks, and tests.

2. Lean on viewsets, but don't be a hero
ModelViewSet is great for CRUD, but the moment a view needs custom flow, drop down to GenericAPIView. Clarity beats cleverness.

3. Pagination from day one
Always paginate list endpoints. Cursor pagination scales better than offset for large tables.

4. Throttling and auth
Use DRF's throttling classes to protect expensive endpoints, and prefer JWT or session auth depending on whether the client is a browser or a service.

5. Observability
Log structured request data, capture latency per endpoint, and alert on 5xx rate. You can't scale what you can't see.`,
    tags: "Backend",
    slug: "designing-scalable-apis-with-drf",
    created_at: "2026-03-18T10:00:00Z",
  },
  {
    id: 1002,
    title: "From Monolith to Modular: A Pragmatic Refactor",
    excerpt: "How to break a large codebase into modules without rewriting everything.",
    description:
      "A step-by-step approach to extracting bounded contexts from a monolith while keeping the lights on.",
    body: `Rewrites fail. Refactors compound. Here's the playbook I use to turn a tangled monolith into a modular system without freezing feature work.

Step 1 — Map the seams
Before touching code, map the domain. Where do entities cluster? Which tables are co-accessed? Those clusters are your future modules.

Step 2 — Create module boundaries inside the monolith
Move related code into a single package. No new services yet — just enforce that other packages can only import through a public interface.

Step 3 — Push the database last
Shared tables are the hardest dependency. Once code is modular, you can split schemas, then databases, then (maybe) services.

Step 4 — Extract a service only when it earns it
A separate service is justified by independent scaling, independent deploys, or team ownership — not by fashion.`,
    tags: "Architecture",
    slug: "monolith-to-modular-pragmatic-refactor",
    created_at: "2026-02-02T09:30:00Z",
  },
  {
    id: 1003,
    title: "React Performance: The 80/20 Checklist",
    excerpt: "The handful of fixes that catch most React perf problems.",
    description:
      "A short, opinionated checklist for diagnosing and fixing the most common React performance issues.",
    body: `Most React performance problems come from a small set of mistakes. Run through this list before reaching for heavy tooling.

1. Stop re-rendering the world
Use the React DevTools Profiler. If a parent re-renders on every keystroke, lift state down or memoize children.

2. Memoize expensive work, not cheap work
useMemo and useCallback are not free. Apply them to expensive computations and to props passed into memoized children — not to every value.

3. Virtualize long lists
Anything over a few hundred rows benefits from windowing (react-window, TanStack Virtual).

4. Defer non-urgent updates
useTransition and useDeferredValue keep input responsive while heavy renders happen in the background.

5. Ship less JavaScript
Code-split routes, lazy-load modals, and audit your bundle. The fastest code is the code you don't ship.`,
    tags: "Frontend",
    slug: "react-performance-80-20-checklist",
    created_at: "2026-01-12T14:15:00Z",
  },
  {
    id: 1004,
    title: "Designing for Failure: Retries, Timeouts, and Idempotency",
    excerpt: "Reliability primitives every distributed system needs.",
    description:
      "A field guide to retries, timeouts, circuit breakers, and idempotency keys — the unglamorous tools that keep production up.",
    body: `Distributed systems fail in boring, repeated ways. The teams that sleep well are the ones that designed for those failures up front.

Timeouts
Every network call needs a timeout. No exceptions. A missing timeout is how a slow downstream takes your whole service down.

Retries with backoff
Retry only idempotent operations, with exponential backoff and jitter. Cap the total attempts.

Idempotency keys
For non-idempotent endpoints (payments, orders), accept a client-provided idempotency key and store the result. Replays return the cached response instead of double-charging.

Circuit breakers
When a dependency is clearly down, stop hammering it. Fail fast, recover gracefully.

Bulkheads
Isolate resources (thread pools, connection pools) per dependency so one bad neighbor can't starve the rest.`,
    tags: "Reliability",
    slug: "designing-for-failure",
    created_at: "2025-12-04T08:00:00Z",
  },
  {
    id: 1005,
    title: "PostgreSQL Indexing: A Mental Model",
    excerpt: "Stop guessing which index to add — reason about it.",
    description:
      "How Postgres chooses indexes, when B-tree isn't enough, and how to read EXPLAIN ANALYZE without panic.",
    body: `Indexes feel like dark magic until you build a mental model. Here's the one I use.

Think in terms of access patterns
An index isn't 'for a column' — it's for a query. Look at WHERE, JOIN, ORDER BY, and GROUP BY clauses. That's what indexes serve.

B-tree is the default, and usually right
B-tree handles equality, range, and ordering on most data types. Reach for GIN (full-text, jsonb, arrays) or BRIN (huge, naturally ordered tables) only when B-tree can't help.

Composite indexes follow the leftmost rule
An index on (a, b, c) helps queries filtering on a, on a+b, and on a+b+c — but not on b alone.

Read EXPLAIN ANALYZE bottom-up
The innermost node runs first. Look for Seq Scan on big tables, mismatched row estimates, and sort steps that spill to disk.

Measure, then index
Add an index, run EXPLAIN ANALYZE before and after, and keep only the ones that earn their write cost.`,
    tags: "Database",
    slug: "postgresql-indexing-mental-model",
    created_at: "2025-11-20T11:45:00Z",
  },
  {
    id: 1006,
    title: "Writing Code Reviews People Actually Want",
    excerpt: "Review the change, not the person — and a few more rules.",
    description:
      "A short guide to giving code reviews that improve the code, the author, and the team.",
    body: `Code reviews are the highest-leverage moment in a team's workflow. Done well, they raise quality and grow engineers. Done badly, they drain morale.

Review the change, not the person
Phrase feedback about the code: 'this function does X' rather than 'you did X'.

Separate must, should, and nit
Label comments so the author knows what blocks merge and what's optional polish.

Ask, don't decree
'What do you think about pulling this into a helper?' invites a conversation. 'Pull this into a helper.' shuts one down.

Approve generously, comment specifically
If the change is good, say so. If it isn't, point at the exact lines and suggest a direction.

Reply within a day
Stale reviews kill momentum. Treat them like production alerts.`,
    tags: "Engineering",
    slug: "code-reviews-people-want",
    created_at: "2025-10-08T16:20:00Z",
  },
];
