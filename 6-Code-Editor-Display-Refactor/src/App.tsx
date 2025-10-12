import 'bulmaswatch/solar/bulmaswatch.min.css'
import CodeCell from './components/code-cell'


const App = () => {
  const [code, setCode] = useState('')
  const [input, setInput] = useState('')

  const onClick = async () => {
    const output = await bundle(input)
    console.log('Bundled Output:', output)
    setCode(output)
  }

  return (
    <div>
      <CodeEditor 
        initialValue='const a = 9'
        onChange={(value) => setInput(value)}  
      />
      <div>  
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview 
        code={code}
      /> 
    </div>
  )
}
export default App