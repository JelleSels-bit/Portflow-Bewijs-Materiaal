'use client'

import {type FunctionComponent, useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Switch} from '@/components/ui/switch'
import {Separator} from '@/components/ui/separator'
import Form from '@/components/custom/form'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {updateUserSchema} from '@/schemas/userSchemas'
import {updateProfileAction} from '@/serverFunctions/users'
import FormError from '@/components/custom/formError'
import type {PublicUser} from '@/models/PublicUser'

interface SettingsPageClientProps {
  user: PublicUser
}

const SettingsPageClient: FunctionComponent<SettingsPageClientProps> = ({user}) => {
  //Dit momenteel niets
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [autoJoin, setAutoJoin] = useState(false)

  //Doet wel iets:
  const [hookform, action] = useZodValidatedForm(updateUserSchema, updateProfileAction)
  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Instellingen</h1>
        <p className="text-sm md:text-base text-muted-foreground">Beheer je account voorkeuren en instellingen</p>
      </div>

      <div className="space-y-4 md:space-y-6">
        {/* Account Settings */}
        <Card>
          <Form hookForm={hookform} action={action}>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-lg md:text-xl">Account</CardTitle>
              <CardDescription className="text-sm">Beheer je account informatie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6 pt-0">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm md:text-base">
                  Gebruikersnaam
                </Label>
                <Input
                  {...hookform.register('username')}
                  id="username"
                  defaultValue={user.username}
                  className="text-sm md:text-base"
                />
                <FormError path="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm md:text-base">
                  Email
                </Label>
                <Input
                  {...hookform.register('email')}
                  id="email"
                  type="email"
                  defaultValue={user.email}
                  className="text-sm md:text-base"
                />
              </div>
              <FormError path="email" />
              <Button className="w-full sm:w-auto">Opslaan</Button>
            </CardContent>
          </Form>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Notificaties</CardTitle>
            <CardDescription className="text-sm">Kies hoe je updates wilt ontvangen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6 pt-0">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <Label htmlFor="email-notifications" className="text-sm md:text-base">
                  Email notificaties
                </Label>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Ontvang emails over nieuwe quiz uitnodigingen
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                className="shrink-0"
              />
            </div>
            <Separator />
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <Label htmlFor="sound-effects" className="text-sm md:text-base">
                  Geluidseffecten
                </Label>
                <p className="text-xs md:text-sm text-muted-foreground">Speel geluiden tijdens het spelen</p>
              </div>
              <Switch
                id="sound-effects"
                checked={soundEffects}
                onCheckedChange={setSoundEffects}
                className="shrink-0"
              />
            </div>
          </CardContent>
        </Card>

        {/* Game Settings */}
        <Card>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Spel voorkeuren</CardTitle>
            <CardDescription className="text-sm">Pas je spelervaring aan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6 pt-0">
            <div className="flex items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5 flex-1">
                <Label htmlFor="auto-join" className="text-sm md:text-base">
                  Automatisch deelnemen
                </Label>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Join automatisch wanneer een room code wordt ingevoerd
                </p>
              </div>
              <Switch id="auto-join" checked={autoJoin} onCheckedChange={setAutoJoin} className="shrink-0" />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        {/*Kan later nog geimplementeerd worden de functies zijn er al voor dit is niet super moeilijk om uit te werken.*/}
        {/*<Card className="border-destructive/50">*/}
        {/*  <CardHeader className="p-4 md:p-6">*/}
        {/*    <CardTitle className="text-lg md:text-xl text-destructive">Gevaarlijke zone</CardTitle>*/}
        {/*    <CardDescription className="text-sm">Permanente acties voor je account</CardDescription>*/}
        {/*  </CardHeader>*/}
        {/*  <CardContent className="space-y-4 p-4 md:p-6 pt-0">*/}
        {/*    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">*/}
        {/*      <div className="flex-1">*/}
        {/*        <p className="text-sm md:text-base font-medium">Account verwijderen</p>*/}
        {/*        <p className="text-xs md:text-sm text-muted-foreground">Verwijder permanent je account en alle data</p>*/}
        {/*      </div>*/}
        {/*      <Button variant="destructive" className="w-full sm:w-auto shrink-0">*/}
        {/*        Verwijderen*/}
        {/*      </Button>*/}
        {/*    </div>*/}
        {/*  </CardContent>*/}
        {/*</Card>*/}
      </div>
    </div>
  )
}

export default SettingsPageClient
