import { NotificationTypes } from '@/entities/types'
import PigsManagement from '@/pages/PigsManagement'
import Sidebar from '@/pages/SidebarFarmer'
import axios from 'axios'
import moment from 'moment'
import { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Outlet, useLocation } from 'react-router-dom'

export default function FarmerRoot() {
  const location = useLocation()
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState<NotificationTypes[]>([])
  const user_id = localStorage.getItem('pftm_token')

  const fetchNotifications = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/notification.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setNotification(res.data)
        }
      })
  }

  const openNotification = () => {
    fetchNotifications()
    setShowNotification(!showNotification)
  }

  return (
    <div className="flex w-full bg-primary-red">
      <Sidebar />
      <div className="w-full border-2 px-2 relative">
        <span className="block w-[0.8rem] h-[0.8rem] rounded-full bg-red-600  absolute right-7 top-7 cursor-pointer z-55 text-red-600">
          .
        </span>
        <IoMdNotificationsOutline
          onClick={openNotification}
          className="text-[4rem] absolute right-5 top-5 cursor-pointer z-40 text-primary-color"
        />
        {showNotification && (
          <div className="absolute right-14 top-24 border-2 w-[20rem] h-[20rem] z-50 bg-white rounded-xl flex items-center flex-col p-2">
            {notification.length > 0 ? (
              <>
                {notification.map((notif, index) => (
                  <div
                    key={index}
                    className="w-full h-20 flex items-center justify-between px-2 bg-primary-color text-white rounded-md"
                  >
                    {notif.remarks === 'today' ? (
                      <p className="font-semibold">
                        The farrowing of {notif.pig_tag} tag is {notif.remarks}{' '}
                        - {moment(notif.farrowing_date).format('ll')}
                      </p>
                    ) : notif.remarks === 'tomorrow' ? (
                      <p className="font-semibold">
                        The farrowing of {notif.pig_tag} tag is {notif.remarks}{' '}
                        - {moment(notif.farrowing_date).format('ll')}
                      </p>
                    ) : notif.remarks === '7 days' ? (
                      <p className="font-semibold">
                        The farrowing of {notif.pig_tag} tag is within{' '}
                        {notif.remarks} -{' '}
                        {moment(notif.farrowing_date).format('ll')}
                      </p>
                    ) : (
                      <p>no notifications</p>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <p>No notifications</p>
            )}
          </div>
        )}

        {location.pathname === '/' ? <PigsManagement /> : <Outlet />}
      </div>
    </div>
  )
}
