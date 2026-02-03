import React from 'react'
import Navbar from './features/Navbar'
import Footer from './features/Footer'
import GetUsers from './pages/GetUsers'
import CreateUser from './pages/CreateUser'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateProduct from './pages/CreateProduct'

const App = () => {
  return (
    <>
        <BrowserRouter>
        <Navbar/>
            <Routes>
                  <Route path="/" element={<GetUsers/>}></Route>
                  <Route path="/create" element={<CreateUser/>}></Route>
                  <Route path="/product" element={<CreateProduct/>}></Route>
            </Routes>

        <Footer/>
        </BrowserRouter>
    </>
  )
}

export default App
