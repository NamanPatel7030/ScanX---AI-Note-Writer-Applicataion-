"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { FileText, Clock, Search, FolderOpen } from "lucide-react";

function Dashboard() {
  const { user } = useUser();
  const fileList = useQuery(api.pdfStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  const isLoaded = fileList !== undefined;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">Your Documents</h2>
        <p className="text-gray-500 dark:text-gray-500 mt-1 text-sm">Upload, manage and take AI-powered notes on your PDFs</p>
      </div>

      {/* File grid */}
      {!isLoaded ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <div key={i} className="rounded-2xl h-[180px] bg-gray-100 dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/[0.06] animate-pulse" />
          ))}
        </div>
      ) : fileList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-2xl bg-purple-500/10 dark:bg-purple-500/10 flex items-center justify-center mb-5">
            <FolderOpen className="w-10 h-10 text-purple-500 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No documents yet</h3>
          <p className="text-sm text-gray-500 dark:text-gray-500 max-w-sm">Upload your first PDF to get started with AI-powered note taking</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {fileList.map((file) => (
            <Link key={file.fileId} href={"/workspace/" + file.fileId}>
              <div className="group relative flex flex-col items-center justify-center p-5 pt-6 rounded-2xl border border-gray-200/60 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] hover:border-purple-300 dark:hover:border-purple-500/20 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-purple-500/5">
                {/* Subtle gradient hover overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-14 h-[4.5rem] rounded-lg bg-gradient-to-br from-red-50 dark:from-red-500/10 to-orange-50 dark:to-orange-500/10 border border-red-100 dark:border-red-500/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-red-500/80 dark:text-red-400/80" />
                </div>
                <h2 className="relative text-[13px] font-medium text-gray-700 dark:text-gray-300 text-center truncate w-full leading-snug">
                  {file?.fileName}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
