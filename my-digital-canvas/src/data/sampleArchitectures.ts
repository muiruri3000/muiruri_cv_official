export type SampleArchitecture = {
  id: number;
  title: string;
  icon: string;
  description: string;
  items_discussed: string;
  external_link: string;
  slug: string;
  body: string;
};

export const sampleArchitectures: SampleArchitecture[] = [
  {
    id: 2001,
    title: "Multi-Tenant SaaS Platform",
    icon: "Cloud",
    description:
      "A horizontally scalable SaaS backend with per-tenant isolation, shared infrastructure, and zero-downtime deploys.",
    items_discussed: "Postgres RLS, Redis, Kubernetes, Blue/Green Deploys, Observability",
    external_link: "",
    slug: "multi-tenant-saas-platform",
    body: `This system serves thousands of tenants from a single shared cluster while keeping each tenant's data strictly isolated.

Tenancy model
Every row in every business table carries a tenant_id. Postgres Row Level Security policies enforce isolation at the database layer, so a misbehaving query cannot leak data across tenants.

Compute
Stateless API pods run on Kubernetes behind an HTTP/2 load balancer. Horizontal Pod Autoscaler scales on CPU and request latency. Background work runs on a separate worker deployment so a slow job never blocks an HTTP request.

Caching
A shared Redis cluster handles session lookups, rate limiting, and short-lived query caches. Cache keys are namespaced by tenant_id to keep eviction fair.

Deploys
Blue/green deploys swap traffic at the ingress only after the new color passes smoke tests. Database migrations are expand-then-contract so old and new code can coexist for the duration of the rollout.

Observability
Structured logs, RED metrics per endpoint, and distributed traces let us answer "what changed?" within minutes of any regression.`,
  },
  {
    id: 2002,
    title: "Event-Driven Order Pipeline",
    icon: "Zap",
    description:
      "An asynchronous order-processing pipeline built on a message broker, with idempotent consumers and a dead-letter queue.",
    items_discussed: "Kafka, Idempotency, Outbox Pattern, Retries, DLQ",
    external_link: "",
    slug: "event-driven-order-pipeline",
    body: `Orders flow through a pipeline of independent services connected by Kafka topics, so any single service can fail or slow down without taking the rest with it.

Producing events safely
The order service writes the order and the outgoing event in the same database transaction using the transactional outbox pattern. A relay process then publishes outbox rows to Kafka, guaranteeing at-least-once delivery without losing events on crash.

Consumers
Each downstream service (inventory, payments, fulfillment, notifications) consumes from its own consumer group. Handlers are idempotent — they key on the event id and short-circuit duplicates.

Failure handling
Retries use exponential backoff with jitter. Anything that fails past the retry budget moves to a per-topic dead-letter queue with the original event, headers, and the last error, so on-call can replay after a fix.

Why events
Decoupling lets teams ship independently and lets the pipeline absorb traffic spikes by buffering in Kafka rather than overloading downstream APIs.`,
  },
  {
    id: 2003,
    title: "Real-Time Analytics Stack",
    icon: "Database",
    description:
      "Sub-second dashboards over billions of events using a streaming ingest path and a columnar query engine.",
    items_discussed: "Kafka, ClickHouse, Materialized Views, Backfills, Cost Controls",
    external_link: "",
    slug: "real-time-analytics-stack",
    body: `The goal: show product, marketing, and ops teams what is happening right now, not what happened yesterday.

Ingest
Events land on Kafka from the application and from a CDC stream off the operational Postgres. A small ingest service validates and enriches each event before writing to ClickHouse via async inserts.

Storage
ClickHouse stores raw events partitioned by day and ordered by (tenant_id, event_time). Materialized views pre-aggregate the most common roll-ups (per minute, per hour, per day) so dashboards hit small tables.

Backfills
Schema changes and bug fixes are handled by replaying from a Kafka topic compacted by event id. Backfills run on a dedicated ClickHouse replica so they never starve live queries.

Cost controls
TTLs drop raw events after 90 days; aggregates live forever. Per-tenant query quotas prevent a single noisy dashboard from blowing the cluster's IO budget.`,
  },
  {
    id: 2004,
    title: "Zero-Trust Internal API Gateway",
    icon: "Shield",
    description:
      "An internal gateway that authenticates every service-to-service call, enforces policy, and gives security a single audit point.",
    items_discussed: "mTLS, OPA, Short-Lived Tokens, Audit Logs, Service Mesh",
    external_link: "",
    slug: "zero-trust-internal-api-gateway",
    body: `Internal traffic used to be implicitly trusted. This design removes that assumption.

Identity
Every service gets a short-lived workload identity issued by the platform. Calls between services use mTLS so both sides cryptographically prove who they are.

Authorization
The gateway calls Open Policy Agent on every request with the caller identity, the target route, and the request metadata. Policies are versioned in git and rolled out alongside service changes.

Tokens
End-user actions carry a short-lived JWT scoped to the specific operation. Tokens are minted by the auth service after the user's session is validated, and they expire in minutes — not hours.

Audit
Every allow/deny decision is logged with caller, target, policy version, and decision reason. Security has a single place to answer "who can do what, and who did what."

Result
A breach in one service no longer means a breach across the platform. Lateral movement requires a valid identity, valid policy, and a valid token — all three.`,
  },
  {
    id: 2005,
    title: "Edge-Cached Content Platform",
    icon: "Globe",
    description:
      "A globally distributed content platform with smart cache invalidation and personalized fragments at the edge.",
    items_discussed: "CDN, Edge Functions, Cache Tags, Stale-While-Revalidate, ESI",
    external_link: "",
    slug: "edge-cached-content-platform",
    body: `The challenge: serve personalized pages in under 100ms anywhere in the world without melting the origin.

Cache strategy
Pages are split into a public shell (cached aggressively at the CDN) and personalized fragments (rendered at the edge per request). Cache tags on each response let us invalidate everything related to a single article or user with one API call.

Edge compute
Edge functions handle auth checks, A/B test assignment, and personalization fragments. Anything that does not need the origin stays at the edge.

Freshness
stale-while-revalidate keeps responses fast: the CDN serves the cached copy immediately and refreshes in the background. Users never wait for a slow origin.

Origin protection
The origin only sees cache misses and explicit invalidations. Request coalescing collapses simultaneous misses for the same key into a single origin call.

Outcome
P95 latency dropped from ~600ms to under 90ms globally, and origin load dropped by an order of magnitude.`,
  },
  {
    id: 2006,
    title: "Background Job Platform",
    icon: "Server",
    description:
      "A reliable background job system with priorities, scheduling, retries, and per-tenant fairness.",
    items_discussed: "Queues, Priorities, Cron, Retries, Fairness, Observability",
    external_link: "",
    slug: "background-job-platform",
    body: `Every product accumulates background work — emails, exports, webhooks, scheduled tasks. This platform runs all of it on shared infrastructure without letting any one workload starve the others.

Queues and priorities
Jobs land on named queues with a priority. Workers pull from a weighted set of queues so high-priority work jumps the line without completely blocking lower-priority work.

Scheduling
A cron-like scheduler enqueues recurring jobs. Schedules are defined in code, reviewed in pull requests, and versioned alongside the service that owns them.

Retries
Each job declares its own retry policy: attempts, backoff, and which exceptions are retryable. Anything past the budget lands in a dead-letter store with full context.

Fairness
A token-bucket per tenant prevents one tenant's bulk export from drowning out everyone else's small jobs. Quotas are tunable in real time.

Observability
Every job emits a structured log line on enqueue, start, finish, and retry. Dashboards show queue depth, age of oldest pending job, and success rate per queue.`,
  },
];
