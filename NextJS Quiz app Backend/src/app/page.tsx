'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {Sparkles, Users, Zap, Trophy, Clock, Brain, ArrowRight, PlayCircle} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary border border-primary/20">
              <Sparkles className="h-4 w-4" />
              Multiplayer Quiz Experience
            </div>
            <h1 className="text-balance text-6xl font-bold tracking-tight text-foreground lg:text-8xl">
              Speel samen.
              <br />
              <span className="text-primary">Quiz harder.</span>
            </h1>
            <p className="text-pretty text-xl text-muted-foreground lg:text-2xl max-w-2xl mx-auto leading-relaxed">
              De ultieme multiplayer quiz game voor vrienden en familie. Maak je eigen vragen, host een sessie, en speel
              met tot 50 spelers tegelijk.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
                <Link href="/host/hostSelect/page">
                  <Zap className="mr-2 h-5 w-5" />
                  Host een Quiz
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 h-auto border-2 bg-black text-white hover:bg-primary  hover:border-primary transition-colors">
                <Link href="/join">
                  <Users className="mr-2 h-5 w-5" />
                  Join met Code
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Waarom onze quiz game?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Alles wat je nodig hebt voor een geweldige quiz ervaring
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-8 border-2 hover:border-primary transition-all group">
              <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <PlayCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Room Code Systeem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Net als Jackbox - genereer een simpele code en spelers kunnen instant joinen. Geen account nodig.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary transition-all group">
              <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Real-time Gameplay</h3>
              <p className="text-muted-foreground leading-relaxed">
                Iedereen speelt tegelijkertijd. Zie live wie als eerste antwoordt en wie de snelste is.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary transition-all group">
              <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Brain className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Eigen Vragen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Maak je eigen quiz met custom vragen en antwoorden. Deel met vrienden en maak het persoonlijk.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary transition-all group">
              <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Trophy className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Scorebord & Rankings</h3>
              <p className="text-muted-foreground leading-relaxed">
                Zie wie de quiz koning is. Met snelheidsbonus voor de snelste spelers en live rankings.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary transition-all group">
              <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Tot 6 Spelers</h3>
              <p className="text-muted-foreground leading-relaxed">
                Perfect voor kleine groepen. Of het nu familie, vrienden of collega's zijn - iedereen kan meedoen.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary transition-all group">
              <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Smooth Experience</h3>
              <p className="text-muted-foreground leading-relaxed">
                Geoptimaliseerd voor alle devices. Speel op je telefoon, tablet of computer. Altijd smooth.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-border bg-muted/20">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Hoe werkt het?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">In 3 simpele stappen aan de slag</p>
          </div>
          <div className="grid gap-12 lg:grid-cols-3 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold text-foreground">Kies welke quiz je wilt spelen</h3>
              <p className="text-muted-foreground leading-relaxed">Uit een ruim aanbod aan quizzes :)</p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold text-foreground">Host de Sessie</h3>
              <p className="text-muted-foreground leading-relaxed">
                Start een quiz sessie en krijg een unieke room code die spelers kunnen gebruiken om te joinen.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold text-foreground">Speel Samen</h3>
              <p className="text-muted-foreground leading-relaxed">
                Spelers joinen met de code en iedereen speelt tegelijk. De snelste juiste antwoorden winnen!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <Card className="p-12 lg:p-16 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background text-center space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">Klaar om te beginnen?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Start vandaag nog een quiz sessie of join een bestaande game.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
                  <Link href="/host/hostSelect/page">
                    Host quiz
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-6 h-auto border-2 bg-black text-white hover:bg-primary  hover:border-primary transition-colors">
                  <Link href="/player/join">Join quiz</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold text-foreground">
              <Zap className="h-6 w-6 text-primary" />
              Quiz Game
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/host/hostSelect/page" className="hover:text-foreground transition-colors">
                Host
              </Link>
              <Link href="/join" className="hover:text-foreground transition-colors">
                Join
              </Link>
              <Link href="/demo" className="hover:text-foreground transition-colors">
                Demo
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
