import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from '../auth/authSlice'
import { FaUser } from "react-icons/fa";
import { fetchAllBillsAsync, selectAllBills } from '../bill/billSlice';

function User() {
    const user = useSelector(getCurrentUser)
    const bills = useSelector(selectAllBills)
    const dispatch = useDispatch()
    const totalSales = bills &&  bills.reduce((amount, bill) => bill.totalAmount + amount, 0);
    useEffect(()=>{
        dispatch(fetchAllBillsAsync())
    },[dispatch])
    return (
        <div>
            <div class="group before:hover:scale-95   before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-orange-200 to-orange-700 before:absolute before:top-0 w-full h-80 relative bg-slate-50 flex flex-col items-center justify-center gap-2 py-3 text-center overflow-hidden">
                <div class="w-28 h-28 mt-8  border-slate-50 z-10    group-hover:-translate-y-10 transition-all duration-500"><FaUser className='group-hover:scale-100 w-28 h-28 text-3xl text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' /></div>
                <div class="z-10  group-hover:-translate-y-10 transition-all duration-500">
                    <span class="text-2xl font-semibold">{user.fullName}</span>
                    <p className='pt-3'>{user.email}</p>
                </div>
                <p class="bg-blue-700 px-4 py-1 text-slate-50 rounded-md z-10  transition-all duration-500 hover:bg-blue-500">{user.role}</p>
            </div>
            {
                user.role === "admin" && (
                    <>
                        <div class="bg-slate-50 flex justify-center items-center gap-7 pb-10 pt-7">
                            <div
                                class="group w-[40%] rounded-lg bg-blue-700 p-5 transition relative duration-300  hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_#2196f3]"
                            >
                                <p class="text-white text-2xl">Rs: {totalSales}</p>
                                <p class="text-white text-sm">Total Sales</p>
                               
                            </div>
                            <div
                                class="group w-[40%] rounded-lg bg-blue-700 p-5 transition relative duration-300  hover:translate-y-[3px] hover:shadow-[0_-8px_0px_0px_rgb(244,67,54)]"
                            >
                                <p class="text-white text-2xl">{bills.length}</p>
                                <p class="text-white text-sm">Total Bills</p>

                               
                            </div>
                        </div>

                    </>
                )
            }
        </div>
    )
}

export default User