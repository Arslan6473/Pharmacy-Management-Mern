import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItemAsync, fetchAllCartItemsAsync, resetCartAsync, selectAllCartItems, selectCartStatus, updateCartAsync } from './cartSlice';
import { getCurrentUser } from '../auth/authSlice';
import Loader from '../common/Loader';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBillAsync } from '../bill/billSlice';
import { updatedProductsOfCartAsync } from '../product/productSlice';

function Cart() {
    const dispatch = useDispatch();
    const items = useSelector(selectAllCartItems);
    const user = useSelector(getCurrentUser);
    const status = useSelector(selectCartStatus);
    const [billDiscount, setBillDiscount] = useState(0);
    const [customerName, setCustomerName] = useState("");

    const notifyAddProduct = () => toast.success("Bill created successfully", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
    });

    const notifyCustomerNameRequired = () => toast.error("Customer name is required", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
    });

    useEffect(() => {
        if (user) {
            dispatch(fetchAllCartItemsAsync(user._id));
        }
    }, [dispatch, user]);

    const handleQunatity = (e, updatedItem) => {
        dispatch(updateCartAsync({ id: updatedItem._id, quantity: +e.target.value }));
    };

    const totalAmount = items.reduce((amount, item) => item.item.price * item.quantity + amount, 0);
    const discountedAmount = Math.round(totalAmount * (1 - billDiscount / 100));
    const totalItems = items.reduce((total, item) => item.quantity + total, 0);

    const handleBill = (e) => {
        if (!customerName.trim()) {
            notifyCustomerNameRequired();
            return;
        }

        const updatedItems = items.map(({ item, quantity }) => ({
            _id: item._id,
            stock: item.stock - quantity,
        }));

        dispatch(updatedProductsOfCartAsync(updatedItems))

        dispatch(createBillAsync({ items: items, totalAmount, totalItems, customer: customerName, totalDiscount: billDiscount }))
            .then(() => notifyAddProduct());

        dispatch(resetCartAsync(user._id))
        setCustomerName("")
        setBillDiscount(0)
    };

    if (!user) {
        return null;
    }

    return (
        <>
            {items.length === 0 && <Navigate to='/' replace={true} />}
            <div className='text-3xl text-blue-600 mb-2 font-semibold '>Bill</div>
            {status === "Loading" ? (<Loader />) : (
                <div>
                    <div className="relative overflow-x-auto rounded-md">
                        <table className="w-full text-sm text-left rtl:text-right bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                            <thead className="text-xs text-white uppercase bg-blue-800 dark:bg-blue-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Product name</th>
                                    <th scope="col" className="px-6 py-3">Quantity</th>
                                    <th scope="col" className="px-6 py-3">Discount</th>
                                    <th scope="col" className="px-6 py-3">Price</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item._id} className="text-md border-b border-white">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {item.item.name}
                                        </th>
                                        <td className="px-6 py-4 ml-2">
                                            <select value={item.quantity} className='text-white text-md rounded-md bg-blue-700' onChange={(e) => handleQunatity(e, item)}>
                                                {[...Array(31).keys()].map((i) => (
                                                    <option key={i} value={i}>{i}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 ml-3">{item.item.discountPercentage} %</td>
                                        <td className="px-6 py-4">Rs: {item.item.price}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => dispatch(deleteCartItemAsync(item._id))}
                                                type="button" className="text-white bg-blue-600 h-7 px-2 rounded-md focus:bg-blue-500 cursor-pointer">
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="bg-gradient-to-r flex justify-center items-center from-blue-400 to-blue-500 text-white pt-4 pb-2">
                            <input
                                type="text"
                                required
                                onChange={e => setCustomerName(e.target.value)}
                                className="relative bg-gray-50 ring-0 outline-none border text-blue-700 font-medium placeholder-blue-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5"
                                placeholder="Customer Name"
                            />
                        </div>
                        <div className='flex flex-col gap-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white'>
                            <div className='flex justify-around font-medium items-center pt-4 text-xl w-full'>
                                <label htmlFor="discount">Discount Percentage</label>
                                <select
                                    id="discount"
                                    value={billDiscount}
                                    className='text-white text-md rounded-md bg-blue-700'
                                    onChange={(e) => setBillDiscount(Number(e.target.value))}>
                                    {[...Array(11).keys()].map((i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex justify-around font-medium items-center pt-2 text-xl w-full'>
                                <p>Total Items</p>
                                <span>{totalItems}</span>
                            </div>
                            <div className='flex justify-around font-medium items-center pt-2 pb-3 text-xl w-full'>
                                <p>Total Amount</p>
                                <span>{discountedAmount}</span>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                    <div className='flex justify-center items-center'>
                        <button
                            onClick={handleBill}
                            type="button"
                            className="mt-3 text-white bg-blue-800 h-10 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Create Bill
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;
