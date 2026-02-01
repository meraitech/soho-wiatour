import type { User } from '@/payload-types'

export type Role = 'admin'

/**
 * Check if a user has admin role
 * @param user - The user object from req.user
 * @param role - The role to check for (must be 'admin')
 * @returns true if user is admin
 */
export const checkRole = (user: User | null, role: Role): boolean => {
  if (!user) return false

  // Check if user has the admin role
  if (user.roles && Array.isArray(user.roles)) {
    return user.roles.includes(role)
  }

  // For safety: users without roles field are treated as not authenticated
  return false
}
