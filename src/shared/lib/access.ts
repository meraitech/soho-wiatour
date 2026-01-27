import type { User } from '@/payload-types'

export type Role = 'admin' | 'editor' | 'viewer'

/**
 * Check if a user has a specific role
 * @param user - The user object from req.user
 * @param role - The role to check for
 * @returns true if user has the specified role
 */
export const checkRole = (user: User | null, role: Role): boolean => {
  if (!user) return false

  // If user has roles array, check if it includes the specified role
  if (user.roles && Array.isArray(user.roles)) {
    return user.roles.includes(role)
  }

  // For backward compatibility with existing users who might not have roles field
  // Treat users without roles as admin (they were created before roles were added)
  return true
}

/**
 * Check if user has any of the specified roles
 * @param user - The user object from req.user
 * @param roles - Array of roles to check for
 * @returns true if user has any of the specified roles
 */
export const hasAnyRole = (user: User | null, roles: Role[]): boolean => {
  if (!user) return false

  if (user.roles && Array.isArray(user.roles)) {
    return roles.some(role => user.roles.includes(role))
  }

  // For backward compatibility
  return true
}

/**
 * Check if user is an admin
 * @param user - The user object from req.user
 * @returns true if user is admin
 */
export const isAdmin = (user: User | null): boolean => {
  return checkRole(user, 'admin')
}
