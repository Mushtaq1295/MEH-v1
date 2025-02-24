import React, { useState } from "react";

const DateFilter = () => {
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]); // Today's date

  return (
    <section className="min-h-screen flex justify-center bg-blue-600 dark:bg-gray-900 px-4">
      <div className="mt-4 w-full h-[350px] sm:max-w-md bg-white rounded-lg shadow-lg dark:border dark:border-gray-700 dark:bg-gray-800 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Filter by Date
        </h2>
        <form className="space-y-5">
          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">
              From:
            </label>
            <input
              type="date"
              name="from"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-2">
              To:
            </label>
            <input
              type="date"
              name="to"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-md"
              required
            />
          </div>

          <button
            // type="submit"
            className="w-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 ease-in-out focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg px-6 py-3 shadow-lg transform hover:scale-105 cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default DateFilter;
