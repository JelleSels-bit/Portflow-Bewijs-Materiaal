'use server'

import ThemeDeleteConfirm from '@/app/themeCRUD/delete/themeDeleteConfirm'
import type {FunctionComponent} from 'react'
import {getThemeById} from '@/dal/theme'
import CrudDeleteHeader from '@/components/custom/CRUD/CrudDeleteHeader'

interface ThemeDeleteConfirmProps {
  params: Promise<{
    themeId: string
  }>
}

const ThemeDeletePage: FunctionComponent<ThemeDeleteConfirmProps> = async ({params}) => {
  const {themeId} = await params
  const theme = await getThemeById(themeId)

  if (!theme) return <div>Theme kon niet gevonden worden</div>

  return (
    <>
      <CrudDeleteHeader name="Thema" returnLink="/themeCRUD/index/ThemePage" />
      <ThemeDeleteConfirm theme={theme} />
    </>
  )
}

export default ThemeDeletePage
