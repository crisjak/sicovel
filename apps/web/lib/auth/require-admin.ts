import { createClient } from '@/lib/supabase/server'

export class UnauthorizedError extends Error {
  constructor() {
    super('No autorizado')
    this.name = 'UnauthorizedError'
  }
}

/**
 * Valida que la sesión actual pertenezca a un administrador autorizado.
 * Lanza UnauthorizedError si no lo es.
 * @returns El email del administrador.
 */
export async function requireAdmin(): Promise<string> {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user?.email) {
    throw new UnauthorizedError()
  }

  const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)

  if (!allowedEmails.includes(user.email.toLowerCase())) {
    throw new UnauthorizedError()
  }

  return user.email
}
