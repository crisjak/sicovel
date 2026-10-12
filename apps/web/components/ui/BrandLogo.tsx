import Image from 'next/image'

interface BrandLogoProps {
    className?: string
    imageClassName?: string
}
import type { ReactNode } from 'react'

export function BrandLogo({ className = '', imageClassName = '' }: BrandLogoProps): ReactNode {
    return (
        <div className={`relative flex-shrink-0 group-hover:scale-[1.03] group-active:scale-[0.98] transition-transform duration-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] ${className}`}>
            <Image
                src="/images/logoCompletoOf.png"
                alt="SICOVEL"
                fill
                priority={true}
                sizes="(max-width: 380px) 140px, (max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 300px, 360px"
                className={`object-contain object-left origin-left ${imageClassName}`}
            />
        </div>
    )
}
