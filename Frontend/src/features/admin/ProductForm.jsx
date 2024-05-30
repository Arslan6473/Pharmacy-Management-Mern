import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearSelectedProduct, createProductAsync, fetchSingleProductAsync, selectSingleproduct, updateProductAsync } from '../product/productSlice';

function ProductForm() {
    const notifyUpdated = () => toast.success("Product updated", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
    });
    const notifyAdded = () => toast.success("Product Added", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
    });
    const { register, handleSubmit, formState: { errors },reset,setValue} = useForm()
    const dispatch = useDispatch()
    const params = useParams()
    const selectedproduct = useSelector(selectSingleproduct)
    useEffect(() => {
        if (params.id) {
            dispatch(fetchSingleProductAsync(params.id))
        } else {
            dispatch(clearSelectedProduct())
        }
    }, [dispatch, params])
    useEffect(() => {
        if (selectedproduct && params.id) {
            setValue("name", selectedproduct.name)
            setValue("price", selectedproduct.price)
            setValue("stock", selectedproduct.stock)
            setValue("discountPercentage", selectedproduct.discountPercentage)
            setValue("thumbnail", selectedproduct.thumbnail)
            setValue("description", selectedproduct.description)
            setValue("company", selectedproduct.company)

        }
    }, [selectedproduct])
    const onSubmit = (data) => {
        const product = { ...data }
        product.price = +product.price;
        product.stock = +product.stock;
        product.discountPercentage = +product.discountPercentage

        if (params.id && selectedproduct) {
            product._id = params.id

            dispatch(updateProductAsync(product))
            notifyUpdated()
        } else {
            dispatch(createProductAsync(product))
            notifyAdded()
        }
        reset()
    }
    return (
        <div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4 p-2">
                    <div className="pb-6">
                        <h1 className=" text-2xl font-bold leading-7 text-blue-600">Add Product</h1>
                        <div >

                            <div className="border-b border-gray-900/10 pb-12">

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("name", {
                                                    required: "Name is required"
                                                })}
                                                id="title"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-blue-600 sm:text-sm px-2 sm:leading-6"
                                            />
                                            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                                        </div>

                                    </div>


                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                {...register("price", {
                                                    required: "Price is required",
                                                    min: 1

                                                })}
                                                id="price"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-blue-600 sm:text-sm px-2 sm:leading-6"
                                            />
                                            {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                            Stock
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                {...register("stock", {
                                                    required: "Stock is required",
                                                    min: 0
                                                })}
                                                id="stock"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-blue-600 sm:text-sm px-2 sm:leading-6"
                                            />
                                            {errors.stock && <p className='text-red-500'>{errors.stock.message}</p>}

                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                            Discount Percentage
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="number"
                                                {...register("discountPercentage", {
                                                    required: "Discount Percentage is required",
                                                    min: 0,
                                                    max: 100
                                                })}
                                                id="discountPercentage"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-blue-600 sm:text-sm px-2 sm:leading-6"
                                            />
                                            {errors.discountPercentage && <p className='text-red-500'>{errors.discountPercentage.message}</p>}

                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                            Product Discription
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                {...register("description", {
                                                    required: "Description is required"

                                                })}
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-blue-600 sm:text-sm px-2 sm:leading-6"
                                                defaultValue={''}
                                            />
                                            {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about product.</p>
                                    </div>



                                    <div className="sm:col-span-3 block">
                                        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                            Brand
                                        </label>
                                        <div className="mt-2">
                                        <input
                                                type="text"
                                                {...register("company", {
                                                    required: "Brand is required"
                                                })}
                                                id="brand"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-blue-600 sm:text-sm px-2 sm:leading-6"
                                            />
                                            {errors.company && <p className='text-red-500'>{errors.company.message}</p>}

                                        </div>
                                    </div>



                                    <div className="col-span-full">
                                        <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                            Thumbnail
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register("thumbnail", {
                                                    required: "Thumbnail is required"

                                                })}
                                                id="thumbnail"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400   focus:ring-blue-600 sm:text-sm px-2 sm:leading-6"
                                            />
                                            {errors.thumbnail && <p className='text-red-500'>{errors.thumbnail.message}</p>}

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        {params.id ? <span>Update Product</span> : <span>Add Product</span>}
                       
                    </button>
                    <ToastContainer />
                </div>
            </form>
        </div>
    )
}

export default ProductForm