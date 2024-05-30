import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCartAsync, selectAllCartItems } from '../cart/cartSlice';
import { fetchFilterProductsAsync, selectAllproducts, selectProductsStatus } from '../product/productSlice';
import Pagination from '../common/Pagination';
import Loader from '../common/Loader';
import { getCurrentUser } from '../auth/authSlice';
import { Link } from 'react-router-dom';

function ProductList() {

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser);
  const products = useSelector(selectAllproducts)
  const status = useSelector(selectProductsStatus)
  const cartItems = useSelector(selectAllCartItems)
  const handlePage = (page) => {
    setPage(page)
  }
  
  const notifyAddProduct = () => toast.success("Added to Bill", {
    position: "top-center",
    autoClose: 2000,
    theme: "light",
  });
  const notifyProductAlready = () => toast.error("Already added to Bill", {
    position: "top-center",
    autoClose: 2000,
    theme: "light",
  });
  const handleCart = (e,product) => {
    if (cartItems.findIndex((cartItem) => cartItem.item._id === product._id) < 0) {
      const newProduct = {  item: product._id, user:user._id };
      dispatch(addToCartAsync(newProduct))
      notifyAddProduct()
    } else {
      notifyProductAlready()
    }

  }
  useEffect(() => {
    const pagination = { _page: page, _per_page: 12}
    const searchQuery ={_search : search}
    dispatch(fetchFilterProductsAsync({pagination,searchQuery}))
  }, [dispatch,page,search])
  return (
    <>
      <div >

        <form className="form relative  ">
          <input
            className="input rounded-full w-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-lg"
            placeholder="Search..."
            required=""
            type="text"
            onChange={e => setSearch(e.target.value)}
          />
          <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </form>

      </div>
      <div className='text-3xl text-blue-600 my-4 font-semibold'>All Products</div>

      {status === 'Loading' ? (
        <Loader />
      ) : !products || products.length === 0 ? (
        <div className="flex justify-center items-center">
          <span className="text-2xl font-medium">No product found</span>
        </div>
      ) : (
        products.map((product) => (
          <div key={product._id} className="bg-gradient-to-r p-3 my-2 from-blue-400 to-blue-500 rounded-lg overflow-hidden shadow-xl w-full">
            <div className="p-4">
              <div className="flex gap-10 justify-center items-center">
                <div className="h-24 w-24 flex flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col overflow-hidden min-w-[76%]">
                  <h2 className="font-semibold mb-2 text-white text-xl">{product.name}</h2>
                  <p className="text-sm mb-4 text-white">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-white font-medium">{product.company}</p>
                    <span className="text-white font-medium">Stock: {product.stock}</span>
                    <div className="text-white font-medium">Discount: {product.discountPercentage} %</div>
                    <div className="text-white font-medium">Rs: {product.price}</div>
                  </div>
                </div>
                <button
                  onClick={(e) => handleCart(e, product)}
                  type="button"
                  className="mt-3 text-blue-600 bg-white h-10 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      <ToastContainer/>
      <Pagination handlePage={handlePage} page={page}/>
    </>
  );
}

export default ProductList;