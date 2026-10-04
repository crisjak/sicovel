import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { BrandLogo } from '@/components/ui/BrandLogo'
import type { FooterData } from '@/types/content'

interface FooterProps {
    data: FooterData
}

// Helper to get icon component by name
function getIcon(iconName: string): LucideIcon {
    const icons = LucideIcons as unknown as Record<string, LucideIcon>
    return icons[iconName] || LucideIcons.Link
}

export function Footer({ data }: FooterProps): React.JSX.Element {
    return (
        <footer className="relative border-t border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Logo & Tagline */}
                    <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
                        <Link
                            href="/"
                            className="flex justify-center md:justify-start items-center group mb-4 select-none"
                        >
                            <BrandLogo 
                                className="w-[200px] sm:w-[260px] md:w-[320px] lg:w-[360px] h-16 md:h-20 translate-y-1.5 md:translate-y-2"
                                imageClassName="scale-[1.75] md:scale-[2.1] lg:scale-[2.25]"
                            />
                        </Link>
                        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto md:mx-0">
                            {data.logo.tagline}
                        </p>
                        {/* Social Links */}
                        <div className="mt-6 flex justify-center md:justify-start gap-4">
                            {data.socialLinks.map((social) => {
                                const Icon = getIcon(social.icon)
                                return (
                                    <a
                                        key={social.platform}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                                        aria-label={social.platform}
                                    >
                                        <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {data.columns.map((column) => (
                        <div key={column.title} className="text-center md:text-left">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
                                {column.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm text-center text-zinc-500 dark:text-zinc-500">
                        {data.copyright}
                    </p>
                </div>
            </div>
        </footer>
    )
}
