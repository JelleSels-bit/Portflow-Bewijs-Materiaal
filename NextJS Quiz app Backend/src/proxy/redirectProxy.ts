import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {getLogger} from '@/lib/logger'
import type {SessionWithProfile} from '@/models/users'
import {getRoleHierarchy, RoleHierarchy} from '@/lib/roles'

const uuidV4Regex = new RegExp(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/gi)

const publicRoutes = new Set<string>(['/', '/login', '/register', '/unauthorized'])

// Record > Set omdat dit beter is voor Role authenticatie. Bij record houdt een key bij de /profile bv en een value de role. En je kan de key dan gebruiken voor het navigeren & de value voor je checks van authorizatie uit te voeren.
const protectedRoutes: Record<string, RoleHierarchy> = {
  '/profile': RoleHierarchy.User,
  '/join': RoleHierarchy.User,
  '/host': RoleHierarchy.Admin,
  '/demo': RoleHierarchy.Admin,
  '/create-quiz': RoleHierarchy.Admin,
  '/userCRUD/index/UsersPage': RoleHierarchy.Admin,
  '/userCRUD/put/:param': RoleHierarchy.Admin,
  '/userCRUD/delete/:param': RoleHierarchy.Admin,
  '/quizCRUD/index/QuizPage': RoleHierarchy.Admin,
  '/quizCRUD/detail/:param': RoleHierarchy.Admin,
  '/quizCRUD/delete/:param': RoleHierarchy.Admin,
  '/quizCRUD/put/:param': RoleHierarchy.Admin,
  '/quizCRUD/create/QuizCreate': RoleHierarchy.Admin,
  '/questionCRUD/put/:param/:param': RoleHierarchy.Admin,
  '/themeCRUD/create/ThemeCreate': RoleHierarchy.Admin,
  '/themeCRUD/delete/:param': RoleHierarchy.Admin,
  '/themeCRUD/index/ThemePage': RoleHierarchy.Admin,
  '/themeCRUD/put/:param': RoleHierarchy.Admin,
  '/host/hostSelect/page': RoleHierarchy.User,
  '/host/waitingRoom/:param': RoleHierarchy.User,
  '/player/join': RoleHierarchy.User,
  '/player/waitingRoom/:param': RoleHierarchy.User,
  '/demo/host-waiting': RoleHierarchy.Admin,
  '/demo/host-playing': RoleHierarchy.Admin,
  '/demo/host-results': RoleHierarchy.Admin,
  '/demo/player-join': RoleHierarchy.Admin,
  '/demo/player-waiting': RoleHierarchy.Admin,
  '/demo/player-playing': RoleHierarchy.Admin,
  '/demo/player-results': RoleHierarchy.Admin,
  '/settings': RoleHierarchy.User,
}

const publicRedirects: Record<string, string> = {
  '/login': '/',
  '/register': '/',
}

//Voor Logger een duidelijker msg mee te geven anders krijg je de waarde van rol bv voor admin is 2. dan zou het zeggen je moet de role: 2 hebben of minstens niv 2 acces hebben fzo, maar dit onduidelijk zeker als je maar 2 roles hebt.
const RoleNames: Record<number, string> = {
  [RoleHierarchy.User]: 'User',
  [RoleHierarchy.Admin]: 'Admin',
}

export async function redirectProxy(
  request: NextRequest,
  response: NextResponse,
  session: SessionWithProfile | null,
): Promise<NextResponse> {
  const parameterizedRoute = request.nextUrl.pathname.replaceAll(uuidV4Regex, ':param')
  const logger = await getLogger()

  // Redirect ingelogde users van login/register naar home
  if (publicRedirects[parameterizedRoute] && session) {
    return NextResponse.redirect(new URL(publicRedirects[parameterizedRoute], request.url))
  }

  // Publieke routes mogen altijd
  if (publicRoutes.has(parameterizedRoute)) {
    return response
  }

  // Protected routes
  const requiredRole = protectedRoutes[parameterizedRoute]

  if (requiredRole !== undefined) {
    // Niet ingelogd -> Login
    if (!session) {
      logger.warn(`Someone tried to access ${request.nextUrl.pathname} while unauthenticated.`)
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Role Check
    if (getRoleHierarchy(session.user.role) < requiredRole) {
      logger.warn(
        `User: ${session.user.username} with role: ${session.user.role} tried to access ${request.nextUrl.pathname}. which requires Role: ${RoleNames[requiredRole]}`,
      )
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    return response
  }

  // API Routes must perform their own authentication since these can be called from external applications.
  if (parameterizedRoute.startsWith('/api')) {
    return response
  }

  logger.warn(`Granting access to ${request.nextUrl.pathname} because its access level hasn't been configured.`)

  return response
}
