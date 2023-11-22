import { DiffEditor } from '@monaco-editor/react'
function Monaco({text}: {text: string}) {
    return (
        <DiffEditor
        height="100vh"
        original={text}
        modified=""
        language="javascript"
        theme="vs-dark"
      />
    )
}


export default Monaco
