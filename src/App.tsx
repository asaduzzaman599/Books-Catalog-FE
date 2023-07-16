import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "./components/ui/button"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-red-500 text-white'>Project Running!</h1>
      <Button variant='destructive'>Click me</Button>
    </>
  )
}

export default App
