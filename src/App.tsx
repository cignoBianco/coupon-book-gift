import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CouponCarousel } from './components/CouponCarousel/CouponCarousel'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <CouponCarousel />
      </div>
    </>
  )
}

export default App
