import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

const EditorExtension = dynamic(
  () => import("../_components/EditiorExtension"),
  { ssr: false }
);

function TextEditor({ fileId }) {
  const notes = useQuery(api.notes.GetNotes, { fileId }); // Get saved notes
  const saveNotes = useMutation(api.notes.AddNotes); // Save notes to DB
  const [isSaving, setIsSaving] = useState(false); // ✅ Initialize state here

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolors: true }),
      Placeholder.configure({ placeholder: "Start typing..." }),
    ],
    editorProps: { attributes: { class: "focus:outline-none h-screen p-5" } },
  });

  // Load content when notes change
  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
    }
  }, [notes, editor]);

 

  if (!editor) return <p>Loading editor...</p>; // Prevent errors

  return (
    <div>
      

      <EditorExtension editor={editor} />
      <div className="overflow-scroll h-[80vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
