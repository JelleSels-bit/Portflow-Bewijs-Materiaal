import type {NextRequest, NextResponse} from 'next/server'
import {getUserByEmail} from '@/dal/users'
import {getLogger} from '@/lib/logger'
import {getSalt, hashOptions, verifyPassword} from '@/lib/passwordUtils'
import {ok, unauthorized} from '@/lib/routeResponses'
import {createJwtToken} from '@/lib/jwtUtils'

//Wordt momenteel niet gebruikt.

export async function POST(request: NextRequest): Promise<NextResponse> {
  const {email, password} = (await request.json()) as {email: string; password: string}

  const user = await getUserByEmail(email)
  const logger = await getLogger()

  const timingSafePassword = `${hashOptions.iterations}$${hashOptions.keyLength}$preventTimingBasedAttacks123$${getSalt()}`
  const isValidPassword = verifyPassword(user?.password ?? timingSafePassword, password)

  if (!isValidPassword) {
    logger.warn(`Failed sign in attempt for ${email}.`)
    return unauthorized()
  }

  logger.info(`Successful authentication request for ${user!.id}`)

  const token = createJwtToken(user!)

  return ok({token})
}


