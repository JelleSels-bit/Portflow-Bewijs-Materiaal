'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {ShieldX, Home, ArrowLeft, Zap} from 'lucide-react'
import type {FunctionComponent} from 'react'
import {useRouter} from 'next/navigation'

const UnauthorizedPage: FunctionComponent = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center mb-10">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <Card className="p-12 lg:p-16 border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 to-background text-center space-y-8">
            <div className="mx-auto w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <ShieldX className="h-12 w-12 text-destructive" />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground">Geen toegang</h1>
              <div className="inline-flex items-center gap-2 rounded-full bg-destructive/10 px-4 py-2 text-sm font-semibold text-destructive border border-destructive/20">
                Error 401 - Unauthorized
              </div>
            </div>

            <p className="text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
              Je hebt geen toegang tot deze pagina. Log in met de juiste credentials of ga terug naar de homepage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Naar Homepage
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => router.back()}
                className="text-lg px-8 py-6 h-auto border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                <ArrowLeft />
                Terug
              </Button>
            </div>

            <div className="pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Denk je dat dit een fout is? Neem contact op met de quiz host.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default UnauthorizedPage
