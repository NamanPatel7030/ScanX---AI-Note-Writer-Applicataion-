
import React, { useState, useRef, useCallback } from "react";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3Icon,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo,
  Sparkles,
  Square,
  Strikethrough,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { sendMessage } from "configs/AIModel";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function EditorExtension({ editor }) {
  const params = useParams();
  const fileid = params?.fileid || "";
  const [isLoading, setIsLoading] = useState(false);
  const typewriterRef = useRef(null);
  const abortRef = useRef(null);
  const existingHtmlRef = useRef("");

  const SearchAI = useAction(api.myAction.SearchAI);
  const saveNotes = useMutation(api.notes.AddNotes);
  const { user, isLoaded, isSignedIn } = useUser();

  const stopGeneration = useCallback(() => {
    // Abort any in-flight fetch
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    // Stop typewriter animation
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
      typewriterRef.current = null;
    }
    // Remove the pulsing cursor from current content
    if (editor) {
      const currentHtml = editor.getHTML();
      const cleaned = currentHtml.replace(/<span class="inline-block[^"]*">[^<]*<\/span>/g, "");
      editor.commands.setContent(cleaned);
    }
    setIsLoading(false);
    toast("AI generation stopped.");
  }, [editor]);

  const typewriterEffect = useCallback((editor, existingHtml, fullHtml, onComplete) => {
    // Strip HTML tags to get plain text length for pacing, but insert actual HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = fullHtml;
    const plainText = tempDiv.textContent || "";
    const totalChars = plainText.length;
    let charIndex = 0;

    // We'll reveal the HTML progressively by slicing the plain text
    // and rebuilding with the wrapper
    const wrapperStart = `<div class="mt-4 p-4 border-l-4 border-purple-500 bg-gray-50 rounded-md">
          <h3 class="font-semibold text-purple-700 mb-2">AI Answer:</h3>
          <div class="text-gray-800 leading-relaxed">`;
    const wrapperEnd = `</div></div>`;

    // Build an array of HTML "frames" by progressively revealing characters
    const getPartialHtml = (index) => {
      let count = 0;
      let result = "";
      let inTag = false;
      for (let i = 0; i < fullHtml.length; i++) {
        if (fullHtml[i] === "<") inTag = true;
        if (inTag) {
          result += fullHtml[i];
          if (fullHtml[i] === ">") inTag = false;
          continue;
        }
        if (count < index) {
          result += fullHtml[i];
          count++;
        } else {
          break;
        }
      }
      return result;
    };

    // Speed: ~20ms per char, faster for longer texts
    const speed = totalChars > 200 ? 10 : 20;

    const type = () => {
      if (charIndex <= totalChars) {
        const partial = getPartialHtml(charIndex);
        editor.commands.setContent(
          `${existingHtml}${wrapperStart}${partial}<span class="inline-block w-0.5 h-4 bg-purple-500 animate-pulse ml-0.5"></span>${wrapperEnd}`
        );
        charIndex++;
        typewriterRef.current = setTimeout(type, speed);
      } else {
        // Final content without cursor
        editor.commands.setContent(
          `${existingHtml}${wrapperStart}${fullHtml}${wrapperEnd}`
        );
        if (onComplete) onComplete();
      }
    };

    type();
  }, []);

  const onAiClick = async () => {
    if (!editor || isLoading) return;

    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );

    if (!selectedText.trim()) {
      toast.error("Please select some text first.");
      return;
    }

    // Clear any ongoing typewriter
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
    }

    setIsLoading(true);
    toast("AI is thinking...");

    // Create abort controller for this request
    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      const result = await SearchAI({ query: selectedText, fileId: fileid });

      if (abortController.signal.aborted) return;

      const UnformattedAns =
        typeof result === "string" ? JSON.parse(result) : result;
      let AllUnformattedAns =
        UnformattedAns?.map((item) => item.pageContent).join(" ") || "";

      const PROMPT = `
        For question: ${selectedText}
        The answer content is: ${AllUnformattedAns}
      `;

      const aiResponseText = await sendMessage(PROMPT, abortController.signal);

      if (abortController.signal.aborted) return;
      const FinalAns = aiResponseText
        .replace(/\*\*(.*?)\*\*/g, "</ul></li><li><strong>$1</strong><ul>")
        .replace(/(?:\r\n|\r|\n)- (.*?)(?=\n|$)/g, "<li>$1</li>")
        .replace(/^<\/ul><\/li>/, "")
        .concat("</ul></li></ul>")
        .replace(/``|html/g, "");

      const AllText = editor.getHTML();

      // Start typewriter animation
      typewriterEffect(editor, AllText, FinalAns, async () => {
        // Save notes after typewriter completes
        if (!isLoaded || !isSignedIn) {
          if (!isSignedIn) toast.error("You must be signed in to save notes.");
          setIsLoading(false);
          return;
        }

        if (!user || !user.primaryEmailAddress?.emailAddress) {
          setIsLoading(false);
          return;
        }

        try {
          await saveNotes({
            notes: editor.getHTML(),
            fileId: fileid,
            createdBy: user.primaryEmailAddress.emailAddress,
          });
          toast.success("AI answer added!");
        } catch (err) {
          console.error("Failed to save notes:", err);
        }
        setIsLoading(false);
      });
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Error in AI processing:", error);
      toast.error("AI processing failed. Please try again.");
      setIsLoading(false);
    }
  };

  const ToolBtn = ({ onClick, isActive, children, title }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg transition-all duration-150 ${
        isActive
          ? "bg-purple-500/15 text-purple-600 dark:text-purple-400"
          : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/[0.06]"
      }`}
    >
      {children}
    </button>
  );

  const Divider = () => <div className="w-px h-6 bg-gray-200/80 dark:bg-white/[0.06] mx-0.5" />;

  return (
    <div className="flex items-center gap-0.5 px-2 py-2 bg-gray-50/80 dark:bg-[#0c0c14]/80 backdrop-blur-sm border-b border-gray-100 dark:border-white/[0.06] flex-wrap transition-colors sticky top-0 z-10">
      {editor && (
        <>
          {/* Undo / Redo */}
          <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo size={17} />
          </ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo size={17} />
          </ToolBtn>

          <Divider />

          {/* Text formatting */}
          <ToolBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
            title="Inline Code"
          >
            <Code size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#ffc078" }).run()}
            isActive={editor.isActive("highlight")}
            title="Highlight"
          >
            <Highlighter size={17} />
          </ToolBtn>

          <Divider />

          {/* Headings */}
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3Icon size={17} />
          </ToolBtn>

          <Divider />

          {/* Lists & blocks */}
          <ToolBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus size={17} />
          </ToolBtn>

          <Divider />

          {/* Text alignment */}
          <ToolBtn
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter size={17} />
          </ToolBtn>
          <ToolBtn
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={17} />
          </ToolBtn>

          {/* AI Button - pushed to the right */}
          <div className="ml-auto flex items-center gap-1.5">
            {isLoading && (
              <button
                onClick={stopGeneration}
                title="Stop AI"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500/20"
              >
                <Square size={12} fill="currentColor" />
                Stop
              </button>
            )}
            <button
              onClick={onAiClick}
              disabled={isLoading}
              title="Ask AI"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                isLoading
                  ? "bg-purple-500/10 text-purple-400 dark:text-purple-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-500 hover:to-blue-400 shadow-md shadow-purple-500/15 hover:shadow-lg hover:shadow-purple-500/20"
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={14} />
              ) : (
                <Sparkles size={14} />
              )}
              {isLoading ? "Thinking..." : "Ask AI"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditorExtension;
