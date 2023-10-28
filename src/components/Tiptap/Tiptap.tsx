import React from "react";
import { Control, Controller } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import IconButton from "@mui/material/IconButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import { Card, CardContent } from "@mui/material";

interface Props {
  control: Control<any>;
  name: string;
  error?: string;
}

const ToolBar: React.FC<{ editor: any }> = ({ editor }) => {
  const isBold = editor?.isActive("bold") ?? false;
  const isItalic = editor?.isActive("italic") ?? false;
  const isStrike = editor?.isActive("strike") ?? false;

  return (
    <Card>
      <CardContent className="p-2 !pb-1">
        <div className="flex ">
          <IconButton
            color={isBold ? "primary" : "default"}
            onClick={() => editor?.chain().toggleBold().focus().run()}
          >
            <FormatBoldIcon />
          </IconButton>
          <IconButton
            color={isItalic ? "primary" : "default"}
            onClick={() => editor?.chain().toggleItalic().focus().run()}
          >
            <FormatItalicIcon />
          </IconButton>
          <IconButton
            color={isStrike ? "primary" : "default"}
            onClick={() => editor?.chain().toggleStrike().focus().run()}
          >
            <StrikethroughSIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

const TipTap = ({ initialValue, onChange }: any) => {
  const tipTapEditor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    onCreate: ({ editor }) => {
      let html = editor.getHTML();
      onChange(html);
    },
    onUpdate: ({ editor }) => {
      let html = editor.getHTML();
      if (html === "<p></p>") html = "";
      onChange(html);
    },
  });
  return (
    <>
      {tipTapEditor && <ToolBar editor={tipTapEditor} />}
      <EditorContent className="mt-4" editor={tipTapEditor} />
    </>
  );
};
const TiptapControlledComponent: React.FC<Props> = ({
  name,
  control,
  error,
}) => {
  const initialValue = `<p>Dear [Name],</p>
<p>We are pleased to inform you about [Topic].</p>
<p>Best regards,</p>
<p>[Your Company]</p>`;
  return (
    <div className="mt-2">
      <div className={error ? " border-solid border-red-500" : ""}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <TipTap initialValue={initialValue} onChange={onChange} />
          )}
        />
      </div>
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default TiptapControlledComponent;
