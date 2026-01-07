'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSwitcher({ locale }) {
    const pathname = usePathname();

    const switchLanguage = (newLocale) => {
        if (!pathname) return `/${newLocale}`;

        const segments = pathname.split('/');
        segments[1] = newLocale; // replace locale segment

        return segments.join('/');
    };

    return (
        <div className="flex items-center gap-2">
            <Link
                href={switchLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${locale === 'en'
                    ? 'bg-cyan-300/20 border border-cyan-300/40 text-cyan-200'
                    : 'border border-white/10 bg-white/5 text-white hover:border-cyan-300/40 hover:text-cyan-200'
                    }`}
            >
                EN
            </Link>

            <Link
                href={switchLanguage('bn')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${locale === 'bn'
                    ? 'bg-cyan-300/20 border border-cyan-300/40 text-cyan-200'
                    : 'border border-white/10 bg-white/5 text-white hover:border-cyan-300/40 hover:text-cyan-200'
                    }`}
            >
                BN
            </Link>
        </div>
    );
}
