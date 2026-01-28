import type {FunctionComponent} from 'react'
import CrudCreateHeader from '@/components/custom/CRUD/CrudCreateHeader'
import ThemeCreateForm from '@/app/themeCRUD/create/ThemeCreateForm'

const ThemeCreate: FunctionComponent = () => {
  return (
    <div className="">
      <CrudCreateHeader name="Thema" returnLink="/themeCRUD/index/ThemePage" />
      <ThemeCreateForm />
    </div>
  )
}

export default ThemeCreate
