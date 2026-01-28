'use server'

import type {FunctionComponent} from 'react'
import ThemeEditForm from '@/app/themeCRUD/put/themeEditForm'
import CrudPutHeader from '@/components/custom/CRUD/CrudPutHeader'
import {getThemeById} from '@/dal/theme'
import {Theme} from '@/generated/prisma/client'

interface ThemeEditPageProps {
  params: Promise<{
    themeId: string
  }>
}

const ThemeEditPage: FunctionComponent<ThemeEditPageProps> = async ({params}) => {
  const {themeId} = await params
  const theme: Theme | null = await getThemeById(themeId)

  if (!theme) return <div>Kan het theme met dit id niet vinden</div>

  return (
    <>
      <CrudPutHeader name={theme.name} returnLink="/themeCRUD/index/ThemePage" />
      <ThemeEditForm theme={theme} />
    </>
  )
}

export default ThemeEditPage
