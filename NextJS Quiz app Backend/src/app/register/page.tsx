'use client'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'
import {Gamepad2} from 'lucide-react'
import Link from 'next/link'
import {registerAction} from '@/serverFunctions/users'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {registerSchema} from '@/schemas/userSchemas'
import FormError from '@/components/custom/formError'

export default function RegisterPage() {
  const [hookForm, action] = useZodValidatedForm(registerSchema, registerAction)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Account aanmaken</CardTitle>
          <CardDescription>Maak een gratis account aan om te beginnen met quizzen</CardDescription>
        </CardHeader>
        <CardContent>
          <Form hookForm={hookForm} action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Naam</Label>
              <Input
                id="username"
                {...hookForm.register('username')}
                placeholder="Je volledige naam"
                className="text-base"
              />
            </div>
            <FormError path="username" />

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...hookForm.register('email')}
                placeholder="je@email.nl"
                className="text-base"
              />
            </div>
            <FormError path="email" />

            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input
                id="password"
                {...hookForm.register('password')}
                type="password"
                placeholder="Minimaal 8 tekens"
                className="text-base"
              />
            </div>
            <FormError path="password" />

            <div className="space-y-2">
              <Label htmlFor="passwordConfirmation">Bevestig wachtwoord</Label>
              <Input
                id="passwordConfirmation"
                {...hookForm.register('passwordConfirmation')}
                type="password"
                placeholder="Herhaal je wachtwoord"
                className="text-base"
              />
            </div>
            <FormError path="passwordConfirmation" />

            <Button type="submit" className="w-full" size="lg">
              Account aanmaken
            </Button>
          </Form>

          <div className="mt-6 text-center text-sm">
            Al een account?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Log hier in
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              Door een account aan te maken ga je akkoord met onze voorwaarden
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
