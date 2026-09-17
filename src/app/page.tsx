export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10">
        <header className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            MoneyQuest
          </div>

          <div className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400">
            Build your first income stream
          </div>
        </header>

        <section className="flex flex-1 flex-col justify-center py-20">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                From $0 to your first online income
              </div>

              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight sm:text-6xl">
                Stop scrolling.
                <br />
                Start earning.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                MoneyQuest helps you choose an online income path based on
                your skills, time, and budget — then gives you real missions
                to actually try it.
              </p>

              <a
  href="/onboarding"
  className="mt-8 inline-block rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition hover:bg-zinc-200"
>
  Start my quest →
</a>

              <p className="mt-4 text-sm text-zinc-600">
                No guru courses. No endless research. Just action.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-500">YOUR QUEST</p>
                  <h2 className="mt-1 text-2xl font-semibold">
                    First $500 online
                  </h2>
                </div>

                <div className="rounded-xl bg-orange-500/10 px-3 py-2 text-sm text-orange-400">
                  🔥 4 day streak
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-zinc-400">Real earnings</span>
                  <span>$84 / $500</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[17%] rounded-full bg-emerald-400" />
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-zinc-800 bg-black/40 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Today&apos;s mission
                </p>

                <h3 className="mt-2 text-lg font-medium">
                  Find 5 businesses that could use your service
                </h3>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-zinc-500">0 / 5 completed</span>
                  <span className="text-sm font-medium text-emerald-400">
                    +50 XP
                  </span>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <div className="flex-1 rounded-xl bg-zinc-800/70 p-4">
                  <p className="text-xs text-zinc-500">LEVEL</p>
                  <p className="mt-1 text-xl font-semibold">3</p>
                </div>

                <div className="flex-1 rounded-xl bg-zinc-800/70 p-4">
                  <p className="text-xs text-zinc-500">XP</p>
                  <p className="mt-1 text-xl font-semibold">420</p>
                </div>

                <div className="flex-1 rounded-xl bg-zinc-800/70 p-4">
                  <p className="text-xs text-zinc-500">MISSIONS</p>
                  <p className="mt-1 text-xl font-semibold">7</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}