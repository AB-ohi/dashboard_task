import Sidebar from '@/Component/Sidebar/Sidebar'
import React from 'react'

const dashboardLayout = ({children}) => {
  return (
    <div className='md:flex relative'>
        <Sidebar/>

      <div className="md:ml-64">
  {children}
</div>
    </div>
  )
}

export default dashboardLayout
