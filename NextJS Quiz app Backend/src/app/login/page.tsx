'use client'

import type React from 'react'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Gamepad2} from 'lucide-react'
import Link from 'next/link'
import {signInAction} from '@/serverFunctions/users'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {signInSchema} from '@/schemas/userSchemas'
import FormError from '@/components/custom/formError'
import SubmitButtonWithLoading from '@/components/custom/submitButtonWithLoading'

export default function LoginPage() {
  const [hookForm, action] = useZodValidatedForm(signInSchema, signInAction)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Gamepad2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">'Welkom terug'</CardTitle>
          <CardDescription>'Log in om je quiz avontuur te starten'</CardDescription>
        </CardHeader>
        <CardContent>
          <Form hookForm={hookForm} action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...hookForm.register('email')}
                placeholder="je@email.nl"
                autoComplete="email"
                className="text-base"
              />
              <FormError path="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <Input
                id="password"
                type="password"
                {...hookForm.register('password')}
                placeholder="••••••••"
                autoComplete="password"
                className="text-base"
              />
            </div>

            <FormError path="password" />

            <div className="flex justify-end gap-4">
              <Link href="/register" className="text-sm text-primary hover:underline">
                Registreren?
              </Link>

              <Link href="/" className="text-sm text-primary hover:underline">
                Wachtwoord vergeten?
              </Link>
            </div>

            <SubmitButtonWithLoading text="Inloggen" loadingText="Logging in" />
          </Form>

          {/*<div className="mt-6 text-center text-sm">*/}
          {/*  {isLogin ? (*/}
          {/*    <>*/}
          {/*      Nog geen account?{' '}*/}
          {/*      <button onClick={() => setIsLogin(false)} className="text-primary font-medium hover:underline">*/}
          {/*        Registreer hier*/}
          {/*      </button>*/}
          {/*    </>*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      Al een account?{' '}*/}
          {/*      <button onClick={() => setIsLogin(true)} className="text-primary font-medium hover:underline">*/}
          {/*        Log hier in*/}
          {/*      </button>*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</div>*/}
        </CardContent>
      </Card>
    </div>
  )
}
