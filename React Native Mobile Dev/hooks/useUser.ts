import {useGetCurrentUser} from '@/api/auth'
import type {User} from '@/model/fireBaseTypes'

const useUser = (): User | null => {
  const {data: user} = useGetCurrentUser()
  return user ?? null
}

export default useUser
