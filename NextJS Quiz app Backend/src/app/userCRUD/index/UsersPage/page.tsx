'use server'

import {type FunctionComponent} from 'react'
import {getUsers} from '@/dal/users'
import {type PublicUser} from '@/models/PublicUser'
import {UsersList} from '@/app/userCRUD/index/UsersList'
import CrudHeader from '@/components/custom/CRUD/CrudHeader'
import CrudSearchSection from '@/components/custom/CRUD/CrudSearchSection'

interface UserManagementPageProps {
  searchParams: Promise<{
    userName?: string
  }>
}

const UserManagementPage: FunctionComponent<UserManagementPageProps> = async ({searchParams}) => {
  const {userName} = await searchParams
  const users: PublicUser[] = await getUsers(userName)

  return (
    <>
      {/* Header Section */}
      <CrudHeader subject="Gebruikers" />

      {/* Search Section */}
      <CrudSearchSection
        title="Gebruiker"
        subtitle="Je kan zoeken op naam & email"
        inputName="userName"
        placeholder="Zoek op email of username..."
        defaultValue={userName}
      />

      <UsersList initialUsers={users} />
    </>
  )
}

export default UserManagementPage
