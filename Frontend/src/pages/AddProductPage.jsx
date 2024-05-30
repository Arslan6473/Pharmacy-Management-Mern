import React from 'react'
import Sidebar from '../features/sidebar/Sidebar'
import ProductForm from '../features/admin/ProductForm'

function AddProductPage() {
  return (
    <>
     <Sidebar>
    <ProductForm/>
   </Sidebar>
    </>
  )
}

export default AddProductPage