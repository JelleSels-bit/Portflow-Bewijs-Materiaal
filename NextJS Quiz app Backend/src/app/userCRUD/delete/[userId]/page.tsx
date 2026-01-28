import { type FunctionComponent } from 'react'
import { getUserById } from '@/dal/users'
import { UserDeleteConfirm } from '@/app/userCRUD/delete/UserDeleteConfirm'

interface UserDeletePageProps {
  params: Promise<{
    userId: string
  }>
}

const UserDeletePage: FunctionComponent<UserDeletePageProps> = async ({ params }) => {
  const { userId } = await params

  const user = await getUserById(userId)

  if (!user) {
    return ( <div>User kan niet worden gevonden.</div>
    )
  }

  return <UserDeleteConfirm user={user} />
}

export default UserDeletePage
