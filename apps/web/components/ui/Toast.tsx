'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastData {
    id: string
    type: ToastType
    message: string
    duration?: number
}

interface ToastProps {
    toast: ToastData
    onDismiss: (id: string) => void
}

function Toast({ toast, onDismiss }: ToastProps) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        // Entrada animada
        const enterTimer = setTimeout(() => setVisible(true), 10)
        // Auto-dismiss
        const dismissTimer = setTimeout(() => {
            setVisible(false)
            setTimeout(() => onDismiss(toast.id), 300)
        }, toast.duration ?? 4000)

        return () => {
            clearTimeout(enterTimer)
            clearTimeout(dismissTimer)
        }
    }, [toast, onDismiss])

    const icons = {
        success: <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />,
        error: <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />,
        info: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />,
    }

    const colors = {
        success: 'border-green-500/30 bg-zinc-900/95',
        error: 'border-red-500/30 bg-zinc-900/95',
        info: 'border-blue-500/30 bg-zinc-900/95',
    }

    return (
        <div
            className={`
                flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-2xl shadow-black/40
                backdrop-blur-md min-w-[280px] max-w-sm transition-all duration-300
                ${colors[toast.type]}
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
            `}
            role="alert"
        >
            {icons[toast.type]}
            <p className="text-sm text-zinc-100 leading-snug flex-1">{toast.message}</p>
            <button
                onClick={() => { setVisible(false); setTimeout(() => onDismiss(toast.id), 300) }}
                className="p-0.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label="Cerrar"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}

// ============================================================
// Container que se renderiza una sola vez en el layout del admin
// ============================================================
interface ToastContainerProps {
    toasts: ToastData[]
    onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps): React.JSX.Element {
    return (
        <div
            className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2"
            aria-live="polite"
            aria-atomic="false"
        >
            {toasts.map((t) => (
                <Toast key={t.id} toast={t} onDismiss={onDismiss} />
            ))}
        </div>
    )
}

// ============================================================
// Hook para manejar toasts
// ============================================================
export function useToast() {
    const [toasts, setToasts] = useState<ToastData[]>([])

    const addToast = (message: string, type: ToastType = 'info', duration = 4000) => {
        const id = crypto.randomUUID()
        setToasts((prev) => [...prev, { id, type, message, duration }])
    }

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }

    return { toasts, addToast, removeToast }
}
