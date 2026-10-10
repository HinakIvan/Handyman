import prisma from '@/tools/prisma'
import {
  UnauthorizedError,
  ForbiddenError,
  authStorage,
  parseTokenBase,
  runWithAuth,
  signToken,
  hashPassword,
  withResult,
} from '@/@base/BaseActionFun'
import { UserRole, type AuthContext } from './action_utils.type'

export {
  UnauthorizedError,
  ForbiddenError,
  authStorage,
  runWithAuth,
  signToken,
  hashPassword,
  withResult,
  UserRole,
}
export type { AuthContext }

export async function parseToken(token: string): Promise<AuthContext | null> {
  const payload = await parseTokenBase(token)
  if (!payload) return null
  const identity = await prisma.accountUser.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      role: true,
      email: true,
      fullName: true,
    },
  })
  if (!identity) return null
  return {
    userId: identity.id,
    role: identity.role as unknown as UserRole,
    email: identity.email,
    full_name: identity.fullName,
  }
}

export function requireAuth<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    const context = authStorage.getStore() as AuthContext | undefined
    if (!context) throw new UnauthorizedError()
    return fn(...args)
  }
}

export function requireRole(roles: UserRole | UserRole[] | string | string[]) {
  return <TArgs extends any[], TReturn>(fn: (...args: TArgs) => Promise<TReturn>) => {
    return async (...args: TArgs): Promise<TReturn> => {
      const context = authStorage.getStore() as AuthContext | undefined
      if (!context) throw new UnauthorizedError()
      const allowedRoles = Array.isArray(roles) ? roles : [roles]
      if (!allowedRoles.map(String).includes(String(context.role))) throw new ForbiddenError()
      return fn(...args)
    }
  }
}

export function getAuthContext(): AuthContext {
  const context = authStorage.getStore() as AuthContext | undefined
  if (!context) throw new UnauthorizedError()
  return context
}

export function getUserId() {
  return getAuthContext().userId
}

export function getRole(): UserRole {
  return getAuthContext().role
}

export function tryGetAuthContext(): AuthContext | null {
  return (authStorage.getStore() as AuthContext | undefined) ?? null
}
