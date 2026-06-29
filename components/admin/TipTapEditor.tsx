"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link2,
  Link2Off,
  ImageIcon,
  Undo,
  Redo,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TipTapEditorProps {
  content?: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TipTapEditor({
  content = "",
  onChange,
  placeholder = "Start writing...",
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TiptapImage.configure({ inline: false }),
      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[360px] px-5 py-4 font-body text-sm text-brand-navy leading-relaxed focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  // Keep toolbar buttons from stealing focus — onMouseDown + preventDefault
  function btn(
    label: string,
    onClick: () => void,
    active: boolean,
    icon: React.ReactNode,
  ) {
    return (
      <button
        key={label}
        type="button"
        title={label}
        aria-label={label}
        aria-pressed={active}
        onMouseDown={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded text-sm transition-colors",
          active
            ? "bg-brand-navy text-brand-paper"
            : "text-brand-slate hover:bg-brand-navy/10 hover:text-brand-navy",
        )}
      >
        {icon}
      </button>
    );
  }

  function sep() {
    return <div className="mx-0.5 h-5 w-px bg-brand-navy/15" />;
  }

  function addLink() {
    if (!editor) return;
    const url = window.prompt("Enter URL");
    if (url)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
  }

  function addImage() {
    if (!editor) return;
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div className="overflow-hidden rounded-lg border border-brand-navy/20 bg-white">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-brand-navy/10 bg-brand-paper/50 px-2 py-1.5">
        {btn(
          "Undo",
          () => editor.chain().focus().undo().run(),
          false,
          <Undo className="h-3.5 w-3.5" />,
        )}
        {btn(
          "Redo",
          () => editor.chain().focus().redo().run(),
          false,
          <Redo className="h-3.5 w-3.5" />,
        )}
        {sep()}
        {btn(
          "Heading 2",
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          editor.isActive("heading", { level: 2 }),
          <Heading2 className="h-3.5 w-3.5" />,
        )}
        {btn(
          "Heading 3",
          () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          editor.isActive("heading", { level: 3 }),
          <Heading3 className="h-3.5 w-3.5" />,
        )}
        {sep()}
        {btn(
          "Bold",
          () => editor.chain().focus().toggleBold().run(),
          editor.isActive("bold"),
          <Bold className="h-3.5 w-3.5" />,
        )}
        {btn(
          "Italic",
          () => editor.chain().focus().toggleItalic().run(),
          editor.isActive("italic"),
          <Italic className="h-3.5 w-3.5" />,
        )}
        {sep()}
        {btn(
          "Bullet List",
          () => editor.chain().focus().toggleBulletList().run(),
          editor.isActive("bulletList"),
          <List className="h-3.5 w-3.5" />,
        )}
        {btn(
          "Ordered List",
          () => editor.chain().focus().toggleOrderedList().run(),
          editor.isActive("orderedList"),
          <ListOrdered className="h-3.5 w-3.5" />,
        )}
        {btn(
          "Blockquote",
          () => editor.chain().focus().toggleBlockquote().run(),
          editor.isActive("blockquote"),
          <Quote className="h-3.5 w-3.5" />,
        )}
        {btn(
          "Divider",
          () => editor.chain().focus().setHorizontalRule().run(),
          false,
          <Minus className="h-3.5 w-3.5" />,
        )}
        {sep()}
        {btn(
          "Add Link",
          addLink,
          editor.isActive("link"),
          <Link2 className="h-3.5 w-3.5" />,
        )}
        {editor.isActive("link") &&
          btn(
            "Remove Link",
            () => editor.chain().focus().unsetLink().run(),
            false,
            <Link2Off className="h-3.5 w-3.5" />,
          )}
        {btn(
          "Insert Image",
          addImage,
          false,
          <ImageIcon className="h-3.5 w-3.5" />,
        )}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}