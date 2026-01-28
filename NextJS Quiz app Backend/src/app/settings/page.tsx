'use server'

import type {FunctionComponent} from 'react'
import SettingsPageClient from '@/app/settings/SettingsClient'
import {getSessionProfileFromCookie} from '@/lib/sessionUtils'
import type {PublicUser} from '@/models/PublicUser'

const SettingsPage: FunctionComponent = async () => {
  const user: PublicUser | null = await getSessionProfileFromCookie()

  if (!user) return <div>De user is null maar dit kan niet...</div>

  return <SettingsPageClient user={user} />
}

export default SettingsPage
