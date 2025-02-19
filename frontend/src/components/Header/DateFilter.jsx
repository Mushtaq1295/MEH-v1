import React from 'react'

const DateFilter = () => {
  return (
    <>
      <section className="min-h-screen bg-blue-600 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 space-y-4 sm:p-8">
              {/* <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit Item
              </h1> */}
              <form className="space-y-4" >
              <div>
                  <label
                    htmlFor="from"
                    className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white"
                  >
                    From :
                  </label>
                  <input
                    type="date"
                    name="from"
                    className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="to"
                    className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl dark:text-white"
                  >
                    To :
                  </label>
                  <input
                    type="date"
                    name="to"
                    value={Date.now()}
                    className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-base px-6 py-3 text-center shadow-lg transform hover:scale-105 cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section> 
    </>
  )
}

export default DateFilter
