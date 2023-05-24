import React from 'react'

function StaticesCards() {
  return (
    <>
    {/* <!-- Statistics Cards --> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <Card data={{name: "Sales",value: 200}}/>
          <Card data={{name: "Orders",value: 20}}/>
          <Card data={{name: "Visitors",value: 150}}/>
          <Card data={{name: "Balance",value: 300}}/>
        </div>
    </>
  )
}

export default StaticesCards;


function Card({data}){
    return (
        <div className="bg-brandbg2 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-brandtext1 dark:border-gray-600 text-brandtext2 font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="stroke-current text-brandtext1 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{data.value}</p>
              <p>{data.name}</p>
            </div>
          </div>
    )
}