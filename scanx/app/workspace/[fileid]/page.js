"use client";
import React from "react";
import { useParams } from "next/navigation";
import Workspace_header from "./_components/workspace_header";
import PdfViewer from "./_components/PdfViewer";
import { useQuery } from "convex/react";
import TextEditor from "./_components/TextEditor";
import { api } from "../../../convex/_generated/api";

function Workspace() {
  const { fileid } = useParams();
  const fileInfo = useQuery(api.pdfStorage.GetFileRecord, {
    fileId: fileid,
  });
  return (
    <div className="bg-white dark:bg-[#09090f] min-h-screen transition-colors">
      <Workspace_header fileName={fileInfo?.fileName ?? "Untitled"} />
      <div className="grid grid-cols-2 divide-x divide-gray-100 dark:divide-white/[0.06]">
        <div>
          <TextEditor fileId={fileid} />
        </div>
        <div>
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
