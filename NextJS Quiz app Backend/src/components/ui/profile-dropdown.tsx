'use client'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Avatar, AvatarFallback} from '@/components/ui/avatar'
import {Settings, LogOut, User} from 'lucide-react'
import {signOutServerFunction} from '@/serverFunctions/users'
import {type FunctionComponent, useId} from 'react'
import type {PublicUser} from '@/models/PublicUser'

interface ProfileDropdownProps {
  user: PublicUser | null
}

const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = ({user}) => {
  // We bepalen de initialen voor de avatar op basis van de username
  const initials = user?.username ? user.username.substring(0, 2).toUpperCase() : '?'
  const isAdmin = user?.role === 'Admin'

  //Dit zou normaal gezien de hydration error moeten fiksen...
  const id = useId()

  return (
    <DropdownMenu key="profile-menu">
      <DropdownMenuTrigger asChild id={id}>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar
            className={`h-10 w-10 border-2 transition-all hover:border-primary ${user ? 'border-primary/20' : 'border-muted-foreground/20'}`}>
            <AvatarFallback className={user ? 'bg-primary/10 text-primary font-semibold' : 'text-muted-foreground'}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <>
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-1 leading-none">
              <div className="flex items-center gap-2">
                <p className="font-medium">{user?.username}</p>
                {isAdmin && (
                  <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs font-semibold text-primary">Admin</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4 hover:text-white" /> Profiel
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4 hover:text-white " /> Instellingen
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:text-white"
            onClick={async () => {
              await signOutServerFunction()
            }}>
            <LogOut className="mr-2 h-4 w-4 hover:text-white" /> Afmelden
          </DropdownMenuItem>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
