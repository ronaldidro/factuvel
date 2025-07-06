import { ColorScheme, useColorScheme } from '@/hooks/use-color-scheme';
import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export default function ColorSchemeToggleTab({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { scheme, updateScheme } = useColorScheme();

    const tabs: { value: ColorScheme; label: string }[] = [
        { value: 'default', label: 'Default' },
        { value: 'green', label: 'Green' },
        { value: 'blue', label: 'Blue' },
        { value: 'violet', label: 'Violet' },
    ];

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
            <br />
            {tabs.map(({ value, label }) => (
                <button
                    key={value}
                    onClick={() => updateScheme(value)}
                    className={cn(
                        'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                        scheme === value
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <span className="text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
