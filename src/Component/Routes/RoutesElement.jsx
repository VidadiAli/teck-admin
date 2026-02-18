import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from '../Body/AdminStructur/AdminLogin/AdminLogin'
import CreateAdmin from '../Body/AdminStructur/CreateAdmin/CreateAdmin'
import Admin from '../Body/AdminStructur/Admin/Admin'
import SalesLogin from '../Body/SalesStructur/SalesLogin/SalesLogin'
import SalesMain from '../Body/SalesStructur/SalesMain/SalesMain'
import Order from '../Body/SalesStructur/SalesMain/Orders/Orders'

const RoutesElement = () => {
  return (
    <div>
      <Routes >
        <Route path='/create-admin-page' element={<CreateAdmin />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/orders' element={<Order />} />
        <Route path='/login' element={<SalesLogin />} />
        <Route path='/' element={<SalesMain />} />
      </Routes>
    </div>
  )
}

export default RoutesElement