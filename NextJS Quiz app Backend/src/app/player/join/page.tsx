'use client'

import {Card} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {LogIn} from 'lucide-react'
import {FunctionComponent, useState} from 'react'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {linkUserToGameSessionSchema} from '@/schemas/UserGameSession'
import {linkUserToGameSessionAction} from '@/serverFunctions/userGameSession'
import FormError from '@/components/custom/formError'

const PlayerJoinPage: FunctionComponent = () => {
  const [hookForm, action] = useZodValidatedForm(linkUserToGameSessionSchema, linkUserToGameSessionAction)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4">
      <Card className="w-full max-w-md border-2 p-8">
        <div className="mb-6 text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight">Join Quiz</h1>
          <p className="mt-2 text-muted-foreground">Voer de room code in om mee te doen</p>
        </div>

        <Form hookForm={hookForm} action={action} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roomCode">Room Code</Label>
            <Input
              id="roomCode"
              placeholder="123456"
              maxLength={6}
              className="text-center text-2xl font-bold tracking-wider"
              {...hookForm.register('roomcode')}
            />
          </div>
          <FormError path="roomcode" />

          <Button type="submit" size="lg" className="w-full">
            <LogIn className="mr-2 h-5 w-5" />
          </Button>
        </Form>
      </Card>
    </div>
  )
}
export default PlayerJoinPage
