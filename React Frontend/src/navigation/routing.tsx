import type {FunctionComponent} from 'react'
import {Routes, Route} from 'react-router'
import Home from "../pages/home.tsx"
import MyEvents from '../pages/myEvents.tsx'
import Settings from '../pages/settings.tsx'


const routing: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/MyEvents" element={<MyEvents />} />
      <Route path="/Settings" element={<Settings />} />
    </Routes>

  )
}

export default routing;