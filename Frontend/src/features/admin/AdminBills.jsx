import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBillsAsync, selectAllBills, selectBillsStatus } from '../bill/billSlice';
import Loader from '../common/Loader';
import Pagination from '../common/Pagination';


function AdminOrders() {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const status = useSelector(selectBillsStatus)
    const bills = useSelector(selectAllBills);
    const [search, setSearch] = useState("")

    const handlePage = (page) => {
        setPage(page)
    }

    const fetchBills = useCallback(() => {
        const searchQuery = { _search: search }
        const pagination = { _page: page, _per_page: 15 };
        dispatch(fetchAllBillsAsync({ pagination, searchQuery }));
    }, [dispatch, page, search]);

    useEffect(() => {
        fetchBills();
    }, [fetchBills]);




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
            <div className='text-3xl text-blue-600 my-4 font-semibold'>All Bills</div>

            {status === "Loading" ? <div className="flex justify-center items-center"><Loader /></div> :
             !bills || bills.length === 0 ? 
             (<div className='flex justify-center items-center'><span className='text-2xl font-medium'>No bill found</span></div>) 
             : <div>
                <section className="relative">
                    <div className="w-full mb-12">
                        <div
                            className="relative flex flex-col min-w-0 break-words w-full mb-6  rounded bg-white text-gray-900"
                        >

                            <div className="block w-full overflow-x-auto rounded-md ">
                                <table className="items-center  w-full  border-collapse ">
                                    <thead>
                                        <tr>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 dark:bg-blue-900 text-white">
                                                Bill #no
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 dark:bg-blue-900 text-white">
                                                #id
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 dark:bg-blue-900 text-white">
                                                Items
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 dark:bg-blue-900 text-white">
                                                Price
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 dark:bg-blue-900 text-white">
                                                Discount
                                            </th>
                                            <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blue-800 dark:bg-blue-900 text-white">
                                                Customer name
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bills.map((bill, index) => (
                                            <tr className='border-b'>
                                                <td className="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    #{index + 1}
                                                </td>
                                                <td className="border-t-0 font-bold px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    #{bill._id}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                                                    {bill.items.map((item) => (
                                                        <div className='flex items-center'>
                                                            <div className="ml-3 font-bold text-gray-900">
                                                                {item.item.name}  - #{item.quantity}
                                                            </div>
                                                        </div>
                                                    ))}

                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    Rs: {bill.totalAmount}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    {bill.totalDiscount}%
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                                                    {bill.customer}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </section>
                <Pagination
                    handlePage={handlePage}
                    page={page}
                />

            </div>}

        </>
    )
}

export default AdminOrders