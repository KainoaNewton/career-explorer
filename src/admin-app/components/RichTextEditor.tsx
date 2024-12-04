import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content) => {
    onChange(content);
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(value);
    }
  }, [value]);

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={value}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | styleselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
        content_css: "//www.tiny.cloud/css/codepen.min.css",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
