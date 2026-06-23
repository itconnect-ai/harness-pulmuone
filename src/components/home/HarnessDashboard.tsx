import type { SupabaseConfigStatus } from "@/lib/config/env";

type HarnessDashboardProps = {
  supabase: SupabaseConfigStatus;
};

const workflowItems = [
  {
    label: "Input",
    title: "PRD / FRD / TRD",
    body: "Product, functional, and technical requirements live in docs/product before planning starts.",
  },
  {
    label: "Plan",
    title: "Epic > Story",
    body: "The Claude Code planning skill writes dependency-aware Epics and ordered Stories into docs/plans.",
  },
  {
    label: "Build",
    title: "TDD + STATUS",
    body: "Each Story starts with a focused test, runs lint/typecheck/test, and updates STATUS.md as work moves.",
  },
] as const;

const qualityGates = [
  "pnpm format:check",
  "pnpm lint",
  "pnpm typecheck",
  "pnpm test",
  "pnpm build",
] as const;

export function HarnessDashboard({ supabase }: HarnessDashboardProps) {
  return (
    <main className="min-h-screen bg-[#f7f7f3] text-[#1f2a24]">
      <section className="border-b border-[#d9ded3] bg-[#fbfcf7]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#54745f]">
              Pulmuone Claude Code Harness
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#172118] md:text-5xl">
              Requirements become documented plans, ordered stories, and visible status.
            </h1>
          </div>
          <div className="w-full max-w-sm border border-[#cdd5c7] bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-[#54745f]">Supabase</p>
            {supabase.configured ? (
              <>
                <p className="mt-2 text-2xl font-semibold text-[#172118]">Ready</p>
                <p className="mt-2 text-sm text-[#56615a]">{supabase.host}</p>
              </>
            ) : (
              <>
                <p className="mt-2 text-2xl font-semibold text-[#7a3e25]">Pending</p>
                <p className="mt-2 text-sm text-[#56615a]">Missing {supabase.missing.join(", ")}</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-5 px-6 py-8 md:grid-cols-3 md:px-8">
        {workflowItems.map((item) => (
          <article key={item.title} className="border border-[#d9ded3] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d806d]">
              {item.label}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-[#172118]">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#56615a]">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-6 pb-10 md:grid-cols-[1.3fr_0.7fr] md:px-8">
        <div className="border border-[#d9ded3] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#172118]">Planning contract</h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-[#54745f]">Trigger</dt>
              <dd className="mt-1 text-sm text-[#56615a]">개발 계획을 수립해</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#54745f]">Output</dt>
              <dd className="mt-1 text-sm text-[#56615a]">docs/plans + docs/stories + STATUS.md</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#54745f]">Hosting</dt>
              <dd className="mt-1 text-sm text-[#56615a]">Vercel native deploys</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#54745f]">Database</dt>
              <dd className="mt-1 text-sm text-[#56615a]">Supabase SSR clients</dd>
            </div>
          </dl>
        </div>

        <div className="border border-[#d9ded3] bg-[#172118] p-5 text-[#f7f7f3] shadow-sm">
          <h2 className="text-lg font-semibold">Quality gates</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {qualityGates.map((gate) => (
              <li key={gate} className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#8dc63f]" />
                <code>{gate}</code>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
