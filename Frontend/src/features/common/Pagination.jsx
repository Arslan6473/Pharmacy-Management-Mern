import React from 'react'

function Pagination({page, handlePage}) {
  return (
    <div>
<div class="flex justify-center items-center my-5 pt-8">
  <button  onClick={e => handlePage(page > 1 ? page - 1 : page)}   class="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium bg-blue-600 text-white border border-blue-300 rounded-lg hover:bg-blue-400 hover:text-white dark:bg-blue-600 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600 dark:hover:text-white">
    <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Previous
  </button>
  <button   onClick={e => handlePage(page+1)} class="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium bg-blue-600 text-white border border-blue-300 rounded-lg hover:bg-blue-400 hover:text-white dark:bg-blue-600 dark:border-blue-600 dark:text-white dark:hover:bg-blue-600 dark:hover:text-white">
    Next
    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </button>
</div>
    </div>
  )
}

export default Pagination