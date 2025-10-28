import { ResizableBox } from 'react-resizable'

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
      width={300}
    >
      {children}
    </ResizableBox>    
  )
}

export default Resizable

