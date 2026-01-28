export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-balance text-4xl font-bold tracking-tight">Quiz Flow Demo</h1>
          <p className="text-muted-foreground">Bekijk alle states van de quiz flow</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Host Flow */}
          <a
            href="/demo/host-waiting"
            className="group block rounded-xl border border-border bg-card p-6 transition-all hover:scale-105 hover:border-primary hover:shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Host: Wachtkamer</h3>
            </div>
            <p className="text-sm text-muted-foreground">Room code scherm met wachtende spelers</p>
          </a>

          <a
            href="/demo/host-playing"
            className="group block rounded-xl border border-border bg-card p-6 transition-all hover:scale-105 hover:border-primary hover:shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Host: Actieve Quiz</h3>
            </div>
            <p className="text-sm text-muted-foreground">Live vraag met antwoorden en scorebord</p>
          </a>

          <a
            href="/demo/host-results"
            className="group block rounded-xl border border-border bg-card p-6 transition-all hover:scale-105 hover:border-primary hover:shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Host: Resultaten</h3>
            </div>
            <p className="text-sm text-muted-foreground">Eindscores met podium voor top 3</p>
          </a>

          {/* Player Flow */}
          <a
            href="/demo/player-join"
            className="group block rounded-xl border border-border bg-card p-6 transition-all hover:scale-105 hover:border-accent hover:shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Speler: Join Scherm</h3>
            </div>
            <p className="text-sm text-muted-foreground">Room code invoeren en naam kiezen</p>
          </a>

          <a
            href="/demo/player-waiting"
            className="group block rounded-xl border border-border bg-card p-6 transition-all hover:scale-105 hover:border-accent hover:shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Speler: Wachten</h3>
            </div>
            <p className="text-sm text-muted-foreground">In lobby wachten op start</p>
          </a>

          <a
            href="/demo/player-playing"
            className="group block rounded-xl border border-border bg-card p-6 transition-all hover:scale-105 hover:border-accent hover:shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold">Speler: Actief Spelen</h3>
            </div>
            <p className="text-sm text-muted-foreground">Vraag met antwoord knoppen en timer</p>
          </a>

          <a
            href="/demo/player-results"
            className="group block rounded-xl border border-border bg-card p-6 transition-all hover:scale-105 hover:border-accent hover:shadow-lg"
          >
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Speler: Resultaten</h3>
            </div>
            <p className="text-sm text-muted-foreground">Persoonlijke score en ranking</p>
          </a>
        </div>
      </div>
    </div>
  )
}
