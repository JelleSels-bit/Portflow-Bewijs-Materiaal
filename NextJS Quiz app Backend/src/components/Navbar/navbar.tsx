'use server'

import {getSessionProfileFromCookie} from '@/lib/sessionUtils'
import NavbarClient from '@/components/Navbar/navbarClient'
import type {PublicUser} from '@/models/PublicUser'

const Navbar = async () => {
  const user: PublicUser | null = await getSessionProfileFromCookie()

  return <NavbarClient initialUser={user} />
}

export default Navbar
