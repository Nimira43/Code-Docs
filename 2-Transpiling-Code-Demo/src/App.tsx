import { useState } from 'react'

const App = () => {
  const [input, setInput] = useState('')
  const [code, setCode] = useState('')

  const onClick = () => {
    console.log(input)
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