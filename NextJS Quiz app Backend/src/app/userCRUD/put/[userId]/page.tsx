
import {type FunctionComponent} from 'react'
import {getUserById} from '@/dal/users'
import {UserEditForm} from '@/app/userCRUD/put/UserEditForm'
import CrudPutHeader from '@/components/custom/CRUD/CrudPutHeader'


interface UserEditPageProps {
  params:  Promise<{
    userId: string
  }>
}

const UserEditPage: FunctionComponent<UserEditPageProps> = async ({ params }) => {
  const { userId } = await params
  const user = await getUserById(userId)

  if (user === null)
    throw new Error("User is null")

  return (

    <div>
      <CrudPutHeader name={user.username} returnLink="/userCRUD/index/UsersPage" />
      <UserEditForm user={user} />
    </div>


  )
}

export default UserEditPage
