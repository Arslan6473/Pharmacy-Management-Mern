import React from 'react'
import Sidebar from '../features/sidebar/Sidebar'
import AdminProducts from'../features/admin/AdminProductList'

function AdminProductsPage() {
  return (
    <>
     <Sidebar>
    <AdminProducts/>
   </Sidebar>
    </>
  )
}

export default AdminProductsPage