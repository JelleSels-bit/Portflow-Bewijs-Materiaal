'use client'

import {type FunctionComponent, useState} from 'react'
import {Card} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {UserCircle, Mail, Shield} from 'lucide-react'
import Link from 'next/link'
import {type PublicUser} from '@/models/PublicUser'
import CrudEmptyList from '@/components/custom/CRUD/CrudEmptyList'

interface UsersListProps {
  initialUsers: PublicUser[]
}

export const UsersList: FunctionComponent<UsersListProps> = ({initialUsers}: UsersListProps) => {
  const [users] = useState(initialUsers)

  if (users.length === 0) {
    return <CrudEmptyList subject="Gebruikers" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Users List */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid gap-4">
          {users.map(user => (
            <Card key={user.id} className="p-6 border-2 hover:border-primary transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center group-hover:bg-primary/20 transition-all flex-shrink-0">
                    <UserCircle className="h-6 w-6 text-primary" />
                  </div>

                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-foreground">{user.username}</h3>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === 'Admin'
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-muted text-muted-foreground border border-border'
                        }`}>
                        <Shield className="h-3 w-3" />
                        {user.role}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm truncate">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/userCRUD/put/${user.id}`}>Bewerken</Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent">
                    <Link href={`/userCRUD/delete/${user.id}`}>Verwijderen</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
