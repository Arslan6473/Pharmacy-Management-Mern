import React from 'react';
import { MdLocalPharmacy } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { RiFolderHistoryFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllCartItems } from '../cart/cartSlice';
import { getCurrentUser } from '../auth/authSlice';

function Sidebar({ children }) {
  const cartItems = useSelector(selectAllCartItems);
  const user = useSelector(getCurrentUser);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
          <NavLink to="/">
            <div className="flex items-center justify-start rtl:justify-end cursor-pointer">
              <MdLocalPharmacy className='text-blue-600 text-3xl mr-2' />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Pharma-Go
              </span>
            </div>
            </NavLink>
            <NavLink to="/signout">
            <div  className="flex items-center">
              <FaSignOutAlt className='cursor-pointer text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
            </div>
            </NavLink>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdProductionQuantityLimits className='cursor-pointer text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                <span className="ms-3">Products</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/bill"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <RiBillFill className='cursor-pointer text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                <span className="flex-1 ms-3 whitespace-nowrap">Bill</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  {cartItems.length}
                </span>
              </NavLink>
            </li>
            {user?.role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/admin/products"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <FaEdit className='cursor-pointer text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                    <span className="ms-3">Edit Product</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/add-product"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <IoMdAddCircle className='cursor-pointer text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                    <span className="ms-3">Add Product</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/bills"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <RiFolderHistoryFill className='cursor-pointer text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                    <span className="ms-3">Bill History</span>
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/user"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaUser className='cursor-pointer text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                <span className="ms-3">User</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
