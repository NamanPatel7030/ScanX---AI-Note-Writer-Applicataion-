"use client";
import { UserButton } from '@clerk/nextjs';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

function Header() {
    const { theme, setTheme } = useTheme();
    return (
        <div className='flex justify-end items-center gap-3 px-6 py-3 border-b border-gray-100 dark:border-white/[0.06] bg-white/80 dark:bg-[#0c0c14]/80 backdrop-blur-xl transition-colors sticky top-0 z-10'>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <UserButton afterSignOutUrl="/" />
        </div>
    );
}

export default Header;