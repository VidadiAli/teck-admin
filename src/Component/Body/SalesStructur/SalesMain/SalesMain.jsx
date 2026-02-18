import React from 'react'
import SalesNavbar from './SalesNavbar/SalesNavbar'
import { Routes, Route } from 'react-router-dom'
import SalesProducts from '../SalesMain/SellerProducts/SalesProducts'
import { useState } from 'react'

const SalesMain = () => {
  const [sellerItem, setSellerItem] = useState({})
  return (
    <div>
      <SalesNavbar setSellerItem={setSellerItem} />
      <Routes>
        <Route path='/' element={<SalesProducts sellerItem={sellerItem} />} />
      </Routes>
    </div>
  )
}

export default SalesMain