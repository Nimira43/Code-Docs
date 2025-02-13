import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

const App = () => {
  const ref = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
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
      plugins: [unpkgPathPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    })
    
    setCode(result.outputFiles[0].text)
  } 

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
        </div>
      </div>
    </>
      )
}
export default App