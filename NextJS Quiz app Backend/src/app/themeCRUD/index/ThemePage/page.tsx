import type {FunctionComponent} from 'react'
import CrudHeader from '@/components/custom/CRUD/CrudHeader'
import ThemesList from '@/app/themeCRUD/index/ThemesList'
import {getThemes} from '@/dal/theme'
import type {Theme} from '@/generated/prisma/client'
import CrudSearchSection from '@/components/custom/CRUD/CrudSearchSection'

interface PageProps {
  searchParams: Promise<{
    themeName?: string
  }>
}

const ThemePage: FunctionComponent<PageProps> = async ({searchParams}) => {
  const {themeName} = await searchParams
  const themes: Theme[] = await getThemes(themeName)

  return (
    <>
      <CrudHeader subject="Thema" />
      <CrudSearchSection title="Zoek Thema's" defaultValue={themeName} inputName="themeName" />
      <ThemesList themes={themes} />
    </>
  )
}

export default ThemePage
