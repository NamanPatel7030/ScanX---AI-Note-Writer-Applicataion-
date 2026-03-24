"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/components/ui/dialog";
import { Input } from "../../../components/components/ui/input";
import { Button } from "../../../components/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function UploadPdf({ children ,isMaxFile}) {
  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.pdfStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.pdfStorage.getFileUrl); //const getFileUrl
  const embbedDocument = useAction(api.myAction.ingest);
  const { user } = useUser();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState();
  const [open, setOpen] = useState(false);
  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };
  const OnUpload = async () => {
    setLoading(true);
    try {
      //Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });
      const { storageId } = await result.json();
      console.log("StorageId", storageId);
      // Step 3: Create a new FileEntry record in the database

      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId: storageId });
      const resp = await addFileEntry({
        fileId: fileId,
        fileName: fileName ?? "Untitled File",
        storageId: storageId,
        createBy: user?.primaryEmailAddress?.emailAddress,
        fileUrl: fileUrl,
      });
      // Api call to Fetch PDF Process data
      const ApiResp = await axios.get("/api/pdf-loader?pdfUrl=" + encodeURIComponent(fileUrl));
      console.log(ApiResp.data.Result);
      await embbedDocument({
        splitText: ApiResp.data.Result,
        fileId: fileId,
      });
      setOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} className="w-full" disabled={isMaxFile}>
            + Upload PDF Files
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md rounded-2xl border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#12121a] shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">Upload PDF</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-4 pt-2">
                <div className="relative group">
                  <div className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-purple-500/30 bg-gray-50/50 dark:bg-white/[0.02] transition-colors cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
                      <Loader2Icon className="w-6 h-6 text-purple-500" style={{ animation: 'none' }} />
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {file ? file.name : "Choose a PDF file"}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-600">PDF up to 10MB</p>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(event) => onFileSelect(event)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-500 mb-1.5 block">Document name</label>
                  <Input
                    placeholder="e.g. Research Paper"
                    onChange={(e) => setFileName(e.target.value)}
                    className="rounded-xl border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.03] focus:ring-purple-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="rounded-xl text-sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={OnUpload}
              disabled={loading || !file}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white shadow-lg shadow-purple-500/15 text-sm font-medium px-6"
            >
              {loading ? <Loader2Icon className="animate-spin mr-2" size={16} /> : null}
              {loading ? "Processing..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UploadPdf;
