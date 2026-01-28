'use client'

import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Mail, Save, Shield, UserCircle, X} from 'lucide-react'
import {Card} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import {type FunctionComponent, useActionState} from 'react'
import {adminUpdateUserAction} from '@/serverFunctions/users'
import type {PublicUser} from '@/models/PublicUser'

interface UserEditFormProps {
  user: PublicUser
}

export const UserEditForm: FunctionComponent<UserEditFormProps> = ({user}) => {
  const [, adminUpdateUserServerAction] = useActionState(adminUpdateUserAction, {success: false})

  return (
    <div className="min-h-screen bg-background">
      {/* Edit Form Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2">
              <form action={adminUpdateUserServerAction} className="space-y-8">
                {/* Read-only Email Field */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    Email
                  </Label>
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border border-border">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-transparent border-0 text-muted-foreground"
                    />
                    <span className="text-xs text-muted-foreground whitespace-nowrap px-3 py-1 bg-background rounded border border-border">
                      Niet bewerkbaar
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Het email adres kan niet gewijzigd worden</p>
                </div>

                {/* Editable Username Field */}
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-base font-semibold flex items-center gap-2">
                    <UserCircle className="h-4 w-4 text-primary" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={user.username}
                    placeholder="Voer een username in"
                    className="text-base"
                    required
                  />
                  <p className="text-sm text-muted-foreground">De username die zichtbaar is in het systeem</p>
                </div>

                {/* Editable Role Field */}
                <div className="space-y-3">
                  <Label htmlFor="role" className="text-base font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Rol
                  </Label>
                  <select
                    id="role"
                    name="role"
                    defaultValue={user.role}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <p className="text-sm text-muted-foreground">Kies de rol van de gebruiker in het systeem</p>
                </div>

                <input type="hidden" name="id" value={user.id} />

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button type="submit" size="lg" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Opslaan
                  </Button>
                  <Link href="/userCRUD/index/UsersPage" className="flex-1">
                    <Button type="button" variant="outline" size="lg" className="w-full bg-transparent">
                      <X className="h-4 w-4 mr-2" />
                      Annuleren
                    </Button>
                  </Link>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
