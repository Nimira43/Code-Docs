import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

const App = () => {
  const ref = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
  } 

  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    if (!ref.current) {
      return
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })
    setCode(result.outputFiles[0].text)
  } 

  const html = `
    <script>
      ${code}
    </script>
  `

  return (
    <>
      <div className='main-container'>
        <h1>CodeDocs</h1>
        <div className='sub-container'>
          <textarea 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder='Enter your code here'
          >
          </textarea>
          <button onClick={onClick}>Submit</button>
        </div>  
        <div className='code-container'> 
          <pre>{code}</pre> 
          <iframe
            title="Code Execution Preview"
            sandbox="allow-scripts"
            srcDoc={html}
          />
        </div>
      </div>
    </>
  )
}
export default App