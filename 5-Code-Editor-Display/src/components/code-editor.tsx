import MonacoEditor from '@monaco-editor/react'

interface CodeEditorProps {
  initialValue: string
}

const CodeEditor = () => {
  return (
    <MonacoEditor
      value='const a = 1'
      language='javascript'
      height='500px'
      theme='dark'
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  )
}

export default CodeEditor