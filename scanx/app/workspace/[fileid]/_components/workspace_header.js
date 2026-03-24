"use client";
import React from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { FileText, ArrowLeft, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function Workspace({ fileName }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-white/80 dark:bg-[#0c0c14]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.06] transition-colors sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Link href="/dashboard" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors">
          <ArrowLeft size={17} className="text-gray-400 dark:text-gray-500" />
        </Link>
        <div className="w-px h-5 bg-gray-200 dark:bg-white/[0.08]" />
        <Link href="/">
          <Image src="/ScanX_Logo.png" alt="ScanX" width={100} height={32} className="dark:brightness-0 dark:invert" />
        </Link>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]">
        <FileText size={13} className="text-purple-500 dark:text-purple-400 flex-shrink-0" />
        <span className="text-[13px] text-gray-600 dark:text-gray-400 font-medium max-w-[280px] truncate">{fileName}</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}

export default Workspace;
