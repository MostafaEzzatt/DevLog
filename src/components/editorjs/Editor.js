import React from "react";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editorjs.tools";

const Editor = ({ setHandleEditor }) => {
  const ReactEditorJS = createReactEditorJS();
  const editorJS = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorJS.current = instance;
    setHandleEditor(editorJS);
  }, []);

  return (
    <>
      <ReactEditorJS
        holder="editor"
        tools={EDITOR_JS_TOOLS}
        onInitialize={handleInitialize}
      >
        <div id="editor" className="editor mb-12 "></div>
      </ReactEditorJS>
    </>
  );
};

export default Editor;
