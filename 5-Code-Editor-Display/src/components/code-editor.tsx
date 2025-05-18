import MonacoEditor from '@monaco-editor/react'

const CodeEditor = () => {
  return (
    <MonacoEditor
      language='javascript'
      height='500px'
      theme='dark'
      options={{
        wordWrap: 'on',
        miniMap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false
      }}
    />
  )
}

export default CodeEditor