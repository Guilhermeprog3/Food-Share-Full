"use client"

import { List_history } from '@/components/list-history'
import Navbar_Private from '@/components/Navbar_Private'
import dynamic from 'next/dynamic'
const OpenStreetMap = dynamic(() => import('../../../components/maps/index'), {
  ssr: false,
})

const Dashboard_page = () => {
  return (
    <>
      <div>
        <div className="mb-10">
          <Navbar_Private/>
        </div>
        <div className="flex p-4">
          <div className="w-2/3 p-2">
            <List_history/>
          </div>
          <div className="w-1/3 p-2">
            <OpenStreetMap /> 
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard_page
