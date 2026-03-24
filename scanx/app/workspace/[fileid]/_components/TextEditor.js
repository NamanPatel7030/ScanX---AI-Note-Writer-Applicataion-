import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const EditorExtension = dynamic(
  () => import("../_components/EditiorExtension"),
  { ssr: false }
);

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, { fileId });
  const saveNotes = useMutation(api.notes.AddNotes);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolors: true }),
      Placeholder.configure({ placeholder: "Start taking notes... Select text and click ✨ for AI insights" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[70vh] p-6 text-gray-800 dark:text-gray-200 prose dark:prose-invert prose-sm max-w-none",
      },
    },
  });

  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
    }
  }, [notes, editor]);

  if (!editor) return (
    <div className="h-[calc(100vh-49px)] flex items-center justify-center text-gray-500 dark:text-gray-600">
      <div className="animate-pulse text-sm">Loading editor...</div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-49px)] flex flex-col">
      <EditorExtension editor={editor} />
      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#0e0e16] transition-colors">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
