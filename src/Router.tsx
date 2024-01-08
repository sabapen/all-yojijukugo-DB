import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import React from 'react'

export const Router = () => {
  return (
    <Routes>
      <Route path='/all-yojijukugo-DB/' element={<Home />} />
    </Routes>
  )
}
