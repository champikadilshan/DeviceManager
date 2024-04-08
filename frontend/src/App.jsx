import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddLocation from './pages/AddLocation'
import ViewLocation from './pages/ViewLocation'
import DeleteLocation from './pages/DeleteLocation'
import EditLocation from './pages/EditLocation'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/locations/add" element={<AddLocation />} />
      <Route path="/locations/:id" element={<ViewLocation />} />
      <Route path="/locations/edit/:id" element={<EditLocation />} />
      <Route path="/locations/delete/:id" element={<DeleteLocation />} />
    </Routes>
  )
}

export default App