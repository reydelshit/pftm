import { Outlet, useLocation } from 'react-router-dom'

import PigsManagement from '@/pages/PigsManagement'
import Sidebar from '@/pages/SidebarFarmer'

export default function FarmerRoot() {
  const location = useLocation()

  // console.log(location.pathname)
  return (
    <div className="flex w-full bg-primary-red">
      <Sidebar />
      <div className="w-full border-2 px-2">
        {location.pathname === '/' ? <PigsManagement /> : <Outlet />}
      </div>
    </div>
  )
}
