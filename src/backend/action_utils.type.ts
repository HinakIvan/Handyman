/**
 * 鉴权类型定义文件
 * 平台: backend
 */

// ===== 枚举定义 =====
export enum UserRole {
  ADMIN = 'ADMIN',
}

// ===== 类型定义 =====
export interface AuthContext {
  userId: string
  role: UserRole
  email: string
  full_name: string
}

// ===== 错误类 =====
export class UnauthorizedError extends Error {
  readonly statusCode = 401
  constructor(message = 'Please login first') {
    super(message)
    this.name = 'UnauthorizedError'
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}

export class ForbiddenError extends Error {
  readonly statusCode = 403
  constructor(message = 'Access denied') {
    super(message)
    this.name = 'ForbiddenError'
    Object.setPrototypeOf(this, ForbiddenError.prototype)
  }
}

// ===== 鉴权方法签名（固定死契约）=====
export declare function requireAuth<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn>

export declare function requireRole(
  roles: UserRole | UserRole[] | string | string[]
): <TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>
) => (...args: TArgs) => Promise<TReturn>

export declare function getAuthContext(): AuthContext
export declare function getUserId(): string
export declare function getRole(): UserRole
export declare function tryGetAuthContext(): AuthContext | null

export declare function signToken(
  userId: number | string,
  role: string,
  expiresIn?: string
): Promise<string>

export declare function hashPassword(password: string): string

export declare function withResult<TArgs extends any[], TData>(
  fn: (...args: TArgs) => Promise<TData>
): (...args: TArgs) => Promise<TData>
