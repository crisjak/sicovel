'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import type { ReactNode } from 'react'

// El formulario se extrae en un componente separado para que el Suspense
// boundary de Next.js pueda prerenderizar la página shell en build time.
function LoginForm(): ReactNode {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  // Mostrar error de acceso no autorizado si viene de middleware
  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setError('Tu cuenta no tiene permisos de administrador.')
    }
  }, [searchParams])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setError('')

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (authError) {
      setError('Credenciales inválidas o acceso no autorizado.')
      setLoading(false)
      return
    }

    // Login exitoso — el middleware validará el email al cargar /inicio
    router.push('/control-sicovel/inicio')
    router.refresh()
  }

  return (
    <div className="w-full max-w-sm px-6">
      {/* Logo / Título */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 mb-4">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-white">Acceso restringido</h1>
        <p className="mt-1 text-sm text-zinc-500">SICOVEL — Panel de administración</p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="cs-email" className="block text-xs font-medium text-zinc-400 mb-1.5">
            Correo electrónico
          </label>
          <input
            id="cs-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-zinc-700 text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="admin@sicovel.cl"
          />
        </div>

        <div>
          <label htmlFor="cs-password" className="block text-xs font-medium text-zinc-400 mb-1.5">
            Contraseña
          </label>
          <input
            id="cs-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-900 border border-zinc-700 text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {loading ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

// Wrapper con Suspense requerido por Next.js cuando se usa useSearchParams()
export default function LoginPage(): ReactNode {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
