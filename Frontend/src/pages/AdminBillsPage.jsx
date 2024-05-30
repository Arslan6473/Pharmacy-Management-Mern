import React from 'react'
import Sidebar from '../features/sidebar/Sidebar'
import AdminBills from'../features/admin/AdminBills'

function AdminBillsPage() {
  return (
    <>
     <Sidebar>
    <AdminBills/>
   </Sidebar>
    </>
  )
}

export default AdminBillsPage