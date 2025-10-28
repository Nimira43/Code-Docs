import { useEffect, useRef } from 'react'
import './preview.css'

interface PreviewProps {
  code: string
}

const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch (err) {
              const root = document.querySelector('#root')
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error: </h4>' + err + '</div>'
              // throw err
              console.error(err)
            }
          }, false)
        </script>
      </body>
    </html>
  `

const Preview = ({ code }: PreviewProps) => {
  const iframe = useRef<any>()

  useEffect(() => {
    const iframeEl = iframe.current
    iframeEl.srcdoc = html

    const handleLoad = () => {
      iframeEl.contentWindow.postMessage(code, '*')
    }

    iframeEl.addEventListener('load', handleLoad)

    return () => {
      iframeEl.removeEventListener('load', handleLoad)
    }
  }, [code])

  return (
    <div className='preview-wrapper'>
      <iframe 
        style={{
          backgroundColor: '#fffdfa'
        }}
        ref={iframe}
        title="Code Execution Preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  )
}

export default Preview