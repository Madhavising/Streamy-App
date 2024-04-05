import React from 'react'
import Sidebar from "./Sidebar"

import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div className='flex bg-white dark:bg-zinc-900 transition-all duration-500'>
        <Sidebar/>
       <Outlet/>
    </div>
  )
}

export default Body