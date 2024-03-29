import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Search from './pages/search'
import NumSearch from './pages/numSearch'

export const Router = () => {
  return (
    <Routes>
      <Route path='/all-yojijukugo-DB/' element={<Home />} />
      <Route path='/all-yojijukugo-DB/search' element={<Search />} />
      <Route path='/all-yojijukugo-DB/num-search' element={<NumSearch />} />
    </Routes>
  )
}
