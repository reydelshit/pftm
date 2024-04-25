import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FarmerRoot from './root/FarmerRoot'
import LayoutFarmer from './root/LayoutFarmer'

import Login from './Login'
import Farmer from './pages/Farmer'
import LivestockReports from './pages/LivestockReports'
import PigsBuff from './pages/PigsBuff'
import PigManagement from './pages/PigsManagement'
import Register from './pages/Register'
import SchedulePigs from './pages/SchedulePigs'

const logoutUser = async () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LayoutFarmer>
        <FarmerRoot />
      </LayoutFarmer>
    ),
    errorElement: <div>Not found</div>,

    children: [
      {
        path: 'pig-buffs',
        element: <PigsBuff />,
      },

      {
        path: 'pig-management',
        element: <PigManagement />,
      },
      {
        path: 'reports',
        element: <LivestockReports />,
      },

      {
        path: 'generate-schedule',
        element: <SchedulePigs />,
      },

      {
        path: 'assigned-farmer',
        element: <Farmer />,
      },
    ],
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <div>Not found</div>,
  },

  {
    path: '/register',
    element: <Register />,
    errorElement: <div>Not found</div>,
  },

  {
    path: 'logout',
    action: logoutUser,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
