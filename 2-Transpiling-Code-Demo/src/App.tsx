import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
// import { ReactDOM } from 'react'

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

  const onClick = () => {
    if (!ref.current) {
      return
    }
    console.log(ref.current)
  }

  return (
    <>
      <div className='main-container'>
        <h1>Transpiling Demo using ESBuild</h1>
        <div className='sub-container'>
          <textarea 
            value={input}
            onChange={e => setInput(e.target.value)}
          >
          </textarea>
          <button onClick={onClick}>Submit</button>
        </div>  
        <pre>{code}</pre>
        <h1 className='logo'>NimiraTech</h1>
      </div>
    </>
      )
}
export default App