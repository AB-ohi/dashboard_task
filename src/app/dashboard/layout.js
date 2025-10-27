import Sidebar from '@/Component/Sidebar/Sidebar'
import React from 'react'

const dashboardLayout = ({children}) => {
  return (
    <div className='flex'>
        <Sidebar/>
      {children}
    </div>
  )
}

export default dashboardLayout
