'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, ArrowLeft, Trash2, X } from 'lucide-react'
import type { FunctionComponent } from 'react'
import { useActionState } from 'react'
import { adminDeleteUserAction } from '@/serverFunctions/users'
import type { PublicUser } from '@/models/PublicUser'

interface UserDeleteConfirmProps {
  user: PublicUser
}

export const UserDeleteConfirm: FunctionComponent<UserDeleteConfirmProps> = ({ user }) => {
  const [, deleteUserAction] = useActionState(adminDeleteUserAction, { success: false })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <Link href="/userCRUD/index/UsersPage">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Terug naar overzicht
              </Button>
            </Link>

            <div className="flex items-center gap-3">
              <div className="rounded-full bg-destructive/10 w-14 h-14 flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-destructive" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  Gebruiker verwijderen
                </h1>
                <p className="text-muted-foreground mt-1">
                  Deze actie kan niet ongedaan gemaakt worden
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 border-2 border-destructive/30">
              <form action={deleteUserAction} className="space-y-8">
                <div className="space-y-4">
                  <p className="text-lg">
                    Ben je zeker dat je de volgende gebruiker wilt verwijderen?
                  </p>

                  <div className="rounded-lg border border-border p-4 bg-muted/50">
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Rol:</strong> {user.role}</p>
                  </div>

                  <p className="text-sm text-destructive">
                    ⚠️ Alle gegevens die gekoppeld zijn aan deze gebruiker worden definitief verwijderd.
                  </p>
                </div>

                <input type="hidden" name="id" value={user.id} />

                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button
                    type="submit"
                    variant="destructive"
                    size="lg"
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Ja, gebruiker verwijderen
                  </Button>

                  <Link href="/userCRUD/index/UsersPage" className="flex-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full bg-transparent"
                    >
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
