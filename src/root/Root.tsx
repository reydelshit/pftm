import { NotificationTypes } from '@/entities/types'
import Dashboard from '@/pages/Dashboard'
import PigsManagement from '@/pages/PigsManagement'
import Sidebar from '@/pages/SidebarFarmer'
import axios from 'axios'
import moment from 'moment'
import { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Outlet, useLocation } from 'react-router-dom'

type NotificationTwo = {
  calendar_id: number
  calendar_title: string
  start: string
  pig_tag: string
  remarks: string
  NOTIFICATION_DATE: string
}
export default function Root() {
  const location = useLocation()
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState<NotificationTypes[]>([])
  const user_id = localStorage.getItem('pftm_token')

  const [notificationsTwo, setNotificationsTwo] = useState<NotificationTwo[]>(
    [],
  )
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

  const fetchNotifications2 = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/notification2.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setNotificationsTwo(res.data)
        }
      })
  }

  // const fetchNotifications = () => {
  //   axios
  //     .all([
  //       axios.get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/notification.php`, {
  //         params: {
  //           user_id: user_id,
  //         },
  //       }),
  //       axios.get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/notification2.php`, {
  //         params: {
  //           user_id: user_id,
  //         },
  //       }),
  //     ])
  //     .then(
  //       axios.spread((res1, res2) => {
  //         const notifications = [...res1.data, ...res2.data]
  //         console.log(notifications)
  //         setNotification(notifications)
  //       }),
  //     )
  //     .catch((error) => {
  //       console.error('Error fetching notifications:', error)
  //     })
  // }

  const openNotification = () => {
    fetchNotifications()
    fetchNotifications2()
    setShowNotification(!showNotification)
  }

  const mergedNotifications = [...notification, ...notificationsTwo]

  const formattedNotifications = mergedNotifications.map((notif) => ({
    ...notif,
    NOTIFICATION_DATE: new Date(notif.NOTIFICATION_DATE),
    source: notif.calendar_title ? 'notificationsTwo' : 'notification',
  }))

  formattedNotifications.sort((a, b) => {
    return Number(b.NOTIFICATION_DATE) - Number(a.NOTIFICATION_DATE)
  })

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
          <div className="absolute right-14 top-24 border-2 w-[25rem] h-[20rem] z-50 bg-white overflow-y-scroll rounded-xl flex items-center flex-col p-2">
            {formattedNotifications.length > 0 ? (
              formattedNotifications.map((notif, index) => (
                <div
                  key={index}
                  className={`w-full h-[8rem]  p-4 gap-4 flex text-sm flex-col items-start text-white mb-2 text-start justify-center px-2  ${
                    notif.remarks === 'passed'
                      ? 'bg-purple-500'
                      : 'bg-primary-color'
                  }  rounded-md`}
                >
                  {notif.remarks === 'today' ? (
                    <p className="font-semibold">
                      {notif.source === 'notification'
                        ? 'The farrowing of '
                        : notif.calendar_title}
                      {notif.source === 'notification' ? notif.pig_tag : null}{' '}
                      {notif.remarks} -{' '}
                      {moment(notif.NOTIFICATION_DATE).format('ll')}
                    </p>
                  ) : notif.remarks === 'tomorrow' ? (
                    <p className="font-semibold">
                      {notif.source === 'notification'
                        ? 'The farrowing of '
                        : notif.calendar_title}
                      {notif.source === 'notification' ? notif.pig_tag : null}{' '}
                      {notif.remarks} -{' '}
                      {moment(notif.NOTIFICATION_DATE).format('ll')}
                    </p>
                  ) : notif.remarks === '7 days' ? (
                    <p className="font-semibold">
                      {notif.source === 'notification'
                        ? 'The farrowing of '
                        : notif.calendar_title}
                      {notif.source === 'notification' ? notif.pig_tag : null}{' '}
                      {notif.remarks} -{' '}
                      {moment(notif.NOTIFICATION_DATE).format('ll')}
                    </p>
                  ) : (
                    <p className="font-semibold">
                      {notif.source === 'notification'
                        ? 'The farrowing of '
                        : notif.calendar_title}
                      {notif.source === 'notification' ? notif.pig_tag : null}{' '}
                      {moment(notif.NOTIFICATION_DATE).format('ll')}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No notifications</p>
            )}
          </div>
        )}

        {location.pathname === '/' ? <Dashboard /> : <Outlet />}
      </div>
    </div>
  )
}
