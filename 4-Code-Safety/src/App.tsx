import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

const App = () => {
  const ref = useRef<any>()
  const iframe = useRef<any>()
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
    console.log("Esbuild service started!");
  } 

  useEffect(() => {
    startService()
  }, [])

  const onClick = async () => {
    console.log("Submit button clicked!")
    if (!ref.current) {
      return
    }

    iframe.current.srcdoc = html

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
    console.log(result);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
    console.log("Posted to iframe:", result.outputFiles[0].text);
  } 

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            console.log('Message received:', event.data);
            try {
              eval(event.data)
            } catch (err) {
              console.error("Runtime error:", err)
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error: </h4>' + err + '</div>'
              throw err
            }
          }, false)
        </script>
      </body>
    </html>
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
          {/* <pre>{code}</pre>  */}
          <iframe
            ref={iframe}
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