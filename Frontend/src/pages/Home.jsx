import React from 'react'
import Sidebar from '../features/sidebar/Sidebar'
import ProductList from '../features/product/components/ProductList'

function Home() {
  return (
    <>
    <Sidebar>
        <ProductList/>
    </Sidebar>
    </>
  )
}

export default Home