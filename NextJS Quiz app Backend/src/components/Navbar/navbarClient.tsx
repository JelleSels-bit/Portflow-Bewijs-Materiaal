'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {
  Home,
  Plus,
  Users,
  Gamepad2,
  Eye,
  Tag,
  BadgeQuestionMark,
  Settings2,
  ChevronDown,
  LogIn,
  UserPlus,
} from 'lucide-react'
import ProfileDropdown from '@/components/ui/profile-dropdown'
import {type Route} from 'next'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import type {FunctionComponent} from 'react'
import type {PublicUser} from '@/models/PublicUser'

interface NavbarProps {
  initialUser: PublicUser | null
}

const Navbar: FunctionComponent<NavbarProps> = ({initialUser}) => {
  const pathname = usePathname()
  const user = initialUser

  if (pathname === '/login') return null

  // 1.  links
  const mainLinks = [
    {href: '/' as Route, label: 'Home', icon: Home, protected: false},
    {href: '/host/hostSelect/page' as Route, label: 'Host', icon: Gamepad2, protected: true},
    {href: '/player/join' as Route, label: 'Join', icon: Users, protected: true},
  ]

  // 2. Beheer links
  const managementLinks = [
    {href: '/demo' as Route, label: 'Demo Mode', icon: Eye},
    {href: '/quizCRUD/create/QuizCreate' as Route, label: 'Quiz Maken', icon: Plus},
    {href: '/userCRUD/index/UsersPage' as Route, label: 'Gebruikers', icon: Users},
    {href: '/quizCRUD/index/QuizPage' as Route, label: 'Quizzen', icon: BadgeQuestionMark},
    {href: '/themeCRUD/index/ThemePage' as Route, label: "Thema's", icon: Tag},
  ]

  const isManagementActive = managementLinks.some(link => pathname === link.href)

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <span className="rounded bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">DEV</span>
            <span className="hidden sm:block text-sm font-medium text-muted-foreground">QuizApp</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Navigatie knoppen */}
            {mainLinks.map(link => {
              if (link.protected && !user) return null
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Button key={link.href} asChild variant={isActive ? 'default' : 'ghost'} size="sm" className="gap-1">
                  <Link href={link.href}>
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{link.label}</span>
                  </Link>
                </Button>
              )
            })}

            {/* Beheer Dropdown (Admin only) */}
            {initialUser?.role == 'Admin' && (
              <DropdownMenu key="admin-menu">
                <DropdownMenuTrigger asChild>
                  <Button variant={isManagementActive ? 'default' : 'ghost'} size="sm" className="gap-1">
                    <Settings2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Beheren</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {managementLinks.map(link => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                      <DropdownMenuItem key={link.href} asChild className={isActive ? 'bg-muted' : ''}>
                        <Link href={link.href} className="flex items-center gap-2 w-full">
                          <Icon className="h-4 w-4" />
                          <span>{link.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Profiel of inlog / registeren knoppen */}
            <div className="ml-2 pl-2 border-l shrink-0 flex items-center gap-2">
              {user ? (
                <ProfileDropdown user={user} />
              ) : (
                <>
                  <Button asChild variant="ghost" size="sm" className="gap-1">
                    <Link href="/login">
                      <LogIn className="h-4 w-4" />
                      <span>Inloggen</span>
                    </Link>
                  </Button>
                  <Button asChild variant="default" size="sm" className="gap-1">
                    <Link href="/register">
                      <UserPlus className="h-4 w-4" />
                      <span>Registreren</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
