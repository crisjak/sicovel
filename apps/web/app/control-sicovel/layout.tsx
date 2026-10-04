import type { ReactNode } from 'react'

export default function ControlSicovelLayout({ children }: { children: ReactNode }): ReactNode {
  // Layout base para /control-sicovel — establece el fondo oscuro global
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-slate-950 text-zinc-900 dark:text-zinc-100 font-sans">
      {children}
    </div>
  )
}
