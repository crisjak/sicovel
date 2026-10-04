import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    keywords: [...siteConfig.seo.keywords],
    authors: [{ name: siteConfig.seo.author }],
    icons: {
        icon: siteConfig.logoPath,
        apple: siteConfig.logoPath,
    },
    openGraph: {
        title: siteConfig.seo.ogTitle,
        description: siteConfig.seo.defaultDescription,
        url: siteConfig.url,
        siteName: siteConfig.seo.siteName,
        locale: 'es_CL',
        type: 'website',
        images: [
            {
                url: '/images/og-image.png',
                width: 1200,
                height: 630,
                alt: 'SICOVEL - Tecnología de Alto Rendimiento',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.seo.ogTitle,
        description: siteConfig.seo.defaultDescription,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>): React.JSX.Element {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className={`${inter.className} antialiased bg-white dark:bg-slate-950 min-h-screen relative overflow-x-hidden text-zinc-900 dark:text-zinc-100`}>
                {/* Global Continuous Background */}
                <div className="fixed inset-0 -z-50 pointer-events-none bg-zinc-50/50 dark:bg-slate-950">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-900/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4 opacity-50 dark:opacity-100" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-900/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4 opacity-50 dark:opacity-100" />
                </div>
                
                <Providers>
                    <ThemeToggle className="fixed top-3 right-4 sm:top-4 sm:right-6 z-[100] hidden md:block" />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
