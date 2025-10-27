import Navbar from '@/Component/Navbar/Navbar'
import React from 'react'

const WithNavbarLayout = ({children}) => {
  return (
    <div>
      <Navbar/>
      {children}
    </div>
  )
}

export default WithNavbarLayout
