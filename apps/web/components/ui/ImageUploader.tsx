import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { Upload, X, ImageIcon, Loader2, CheckCircle2 } from 'lucide-react'

interface ImageUploaderProps {
    /** URL actual de la imagen (para mostrar preview inicial) */
    currentUrl?: string
    /** Carpeta destino en el bucket de Supabase (ej: "hero", "servicios") */
    carpeta?: string
    /** Callback con la URL pública cuando la imagen se sube con éxito */
    onUploadSuccess: (url: string) => void
    /** Etiqueta descriptiva del campo */
    label?: string
    /** Texto de ayuda extra */
    hint?: string
    /** Si el campo está en modo de solo lectura */
    disabled?: boolean
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error'

export function ImageUploader({
    currentUrl,
    carpeta = 'general',
    onUploadSuccess,
    label = 'Imagen',
    hint,
    disabled = false,
}: ImageUploaderProps): React.JSX.Element {
    const [preview, setPreview] = useState<string | null>(currentUrl || null)
    const [status, setStatus] = useState<UploadStatus>('idle')
    const [errorMsg, setErrorMsg] = useState('')
    const [isDragging, setIsDragging] = useState(false)
    const [imageError, setImageError] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Sincronizar el preview si cambia la URL original externa y resetear errores
    useEffect(() => {
        setPreview(currentUrl || null)
        setImageError(false)
    }, [currentUrl])

    const subirImagen = useCallback(async (file: File) => {
        if (disabled) return
        setStatus('uploading')
        setErrorMsg('')
        setImageError(false)

        // Preview local inmediato
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        const formData = new FormData()
        formData.append('file', file)
        formData.append('carpeta', carpeta)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const json = await res.json()

            if (!res.ok || !json.success) {
                throw new Error(json.error || 'Error desconocido al subir la imagen.')
            }

            setStatus('success')
            onUploadSuccess(json.url)

            // Volver a idle tras 2s
            setTimeout(() => setStatus('idle'), 2000)
        } catch (err: any) {
            setStatus('error')
            setErrorMsg(err.message || 'Error al subir la imagen.')
            setPreview(currentUrl || null)
            setTimeout(() => setStatus('idle'), 4000)
        }
    }, [carpeta, currentUrl, onUploadSuccess, disabled])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return
        const file = e.target.files?.[0]
        if (file) subirImagen(file)
        // Resetear input para permitir volver a seleccionar el mismo archivo
        if (inputRef.current) inputRef.current.value = ''
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (disabled) return
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) subirImagen(file)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (disabled) return
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        if (disabled) return
        setIsDragging(false)
    }

    const limpiarPreview = () => {
        if (disabled) return
        setPreview(null)
        setStatus('idle')
        onUploadSuccess('')
    }

    const isUploading = status === 'uploading'

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {label}
                </label>
            )}

            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => !isUploading && !disabled && inputRef.current?.click()}
                className={`relative rounded-xl border-2 border-dashed transition-all overflow-hidden
                    ${disabled
                        ? 'border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-slate-900/20 cursor-not-allowed opacity-65'
                        : isDragging
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.01] cursor-pointer'
                            : 'border-zinc-300 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 bg-zinc-50 dark:bg-slate-900/50 cursor-pointer'
                    }
                    ${isUploading ? 'pointer-events-none opacity-80' : ''}
                `}
                style={{ minHeight: '160px' }}
            >
                {/* Preview de imagen */}
                {preview && !imageError ? (
                    <div className="relative w-full h-48 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={() => {
                                console.warn('[ImageUploader] Error de red / imagen no existe:', preview)
                                setImageError(true)
                            }}
                        />
                        {/* Overlay con estado */}
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                                <Loader2 className="w-8 h-8 text-white animate-spin" />
                                <span className="text-white text-sm font-medium">Subiendo imagen...</span>
                            </div>
                        )}
                        {status === 'success' && (
                            <div className="absolute inset-0 bg-green-900/40 flex flex-col items-center justify-center gap-2">
                                <CheckCircle2 className="w-8 h-8 text-green-400" />
                                <span className="text-white text-sm font-medium">¡Imagen guardada!</span>
                            </div>
                        )}
                        {/* Botón eliminar */}
                        {!isUploading && !disabled && (
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); limpiarPreview() }}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors z-10"
                                title="Quitar imagen"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                ) : (
                    // Estado vacío
                    <div className="flex flex-col items-center justify-center gap-3 py-10 px-4 text-center">
                        {isUploading ? (
                            <>
                                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Subiendo imagen...</p>
                            </>
                        ) : (
                            <>
                                <div className={`p-3 rounded-full transition-colors ${isDragging && !disabled ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                                    <ImageIcon className={`w-7 h-7 ${isDragging && !disabled ? 'text-blue-500' : 'text-zinc-400'}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        {disabled
                                            ? 'Sin imagen configurada'
                                            : isDragging ? 'Suelta la imagen aquí' : 'Arrastra una imagen o haz clic'
                                        }
                                    </p>
                                    {!disabled && (
                                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                                            JPG, PNG, WebP · Máx. 15 MB
                                        </p>
                                    )}
                                </div>
                                {!disabled && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
                                        <Upload className="w-3.5 h-3.5" />
                                        Seleccionar archivo
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Error */}
            {status === 'error' && errorMsg && (
                <p className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
                    <X className="w-3.5 h-3.5 flex-shrink-0" />
                    {errorMsg}
                </p>
            )}

            {/* Hint */}
            {hint && status === 'idle' && (
                <p className="text-xs text-zinc-400 dark:text-zinc-500">{hint}</p>
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                onChange={handleFileChange}
                className="hidden"
                id="image-uploader-input"
            />
        </div>
    )
}
