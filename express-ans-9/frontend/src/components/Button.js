import React from 'react'

function Button({icon,id,color}) {
  return (
    <div className="w-auto h-auto" id={id}>
        <div className="flex-1 h-full ">
          <div className={`flex items-center justify-center flex-1 h-full p-2 bg-${color} text-white shadow rounded-full`}>
            <div className="relative">
              {icon}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Button