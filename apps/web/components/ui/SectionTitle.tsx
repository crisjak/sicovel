import React from 'react'

interface SectionTitleProps {
    text: string
}

export function SectionTitle({ text }: SectionTitleProps): React.JSX.Element | null {
    if (!text) return null

    const words = text.trim().split(' ')
    const firstWord = words[0] || ''
    const rest = words.slice(1).join(' ')

    return (
        <span className="inline-block">
            <span className="text-blue-900 dark:text-cyan-100 mr-2 md:mr-3">
                {firstWord}
            </span>
            {rest && (
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent inline-block">
                    {rest}
                </span>
            )}
        </span>
    )
}
