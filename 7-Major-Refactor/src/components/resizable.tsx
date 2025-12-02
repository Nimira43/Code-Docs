import { ResizableBox } from 'react-resizable'
import './resizable.css'

interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children?: React.ReactNode
}

const Resizable = ({ 
  direction, 
  children
}: ResizableProps) => {
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>    
  )
}

export default Resizable

