import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  return (
    <Editor
      apiKey="v94ivhx462ov6ba2o3e9garnpshvzs43zc2xl1ya73ejdgx4"
      value={content}
      onEditorChange={(newContent) => onChange(newContent)}
      init={{
        height: 500,
        menubar: false,
        skin: "oxide-dark",
        content_css: "dark",
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
          'markdown', 'powerpaste', 'fullscreen', 'media', 'autosave', 'image',
          'imagetools'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | ' +
          'bullist numlist | ' +
          'removeformat | image media | fullscreen markdown | help',
        placeholder: placeholder,
        images_upload_url: '/api/upload-image',
        automatic_uploads: true,
        autosave_interval: '30s',
        autosave_prefix: 'tinymce-autosave-{path}{query}-',
        autosave_restore_when_empty: true,
        content_style: `
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 16px;
            color: white;
            background-color: #121212;
          }
          h1 {
            font-size: 2.5em !important;
            font-weight: 700 !important;
            margin-bottom: 0.5em !important;
            color: white !important;
          }
          h2 {
            font-size: 2em !important;
            font-weight: 600 !important;
            margin-bottom: 0.5em !important;
            color: white !important;
          }
          h3 {
            font-size: 1.5em !important;
            font-weight: 600 !important;
            margin-bottom: 0.5em !important;
            color: white !important;
          }
        `
      }}
    />
  );
}