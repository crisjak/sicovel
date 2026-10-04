import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BrandLogo } from '@/components/ui/BrandLogo'
import { Sparkles, ArrowLeft, LogOut } from 'lucide-react'
import type { ReactNode } from 'react'

export default async function AdminInicioLayout({ children }: { children: ReactNode }): Promise<ReactNode> {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/control-sicovel/login')
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-zinc-100 dark:bg-slate-950">
            {/* ── Sidebar ── */}
            <aside className="w-full md:w-64 md:h-screen md:sticky top-0 bg-white dark:bg-[#0a0f1c] border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 shrink-0 z-40">
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
                        <Link href="/control-sicovel/inicio" className="flex items-center group select-none">
                            <BrandLogo 
                                className="w-[160px] h-12 translate-y-1"
                                imageClassName="scale-[1.4]"
                            />
                        </Link>
                        <p className="mt-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                            Control Panel
                        </p>
                    </div>

                    {/* Menú */}
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                        <Link
                            href="/control-sicovel/inicio"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        >
                            <Sparkles className="w-4 h-4" />
                            Inicio
                        </Link>
                    </nav>

                    {/* Footer del Sidebar (Usuario y Logout) */}
                    <div className="px-4 py-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                        <div className="text-xs text-zinc-500">
                            Sesión activa: <br />
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300 truncate block mt-0.5" title={user.email}>
                                {user.email}
                            </span>
                        </div>
                        <Link
                            href="/control-sicovel/logout"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full"
                        >
                            <LogOut className="w-4 h-4" />
                            Cerrar sesión
                        </Link>
                        <div className="pt-2">
                            <Link
                                href="/"
                                target="_blank"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-slate-800 transition-colors w-full"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver sitio público
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Contenido Principal ── */}
            <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
