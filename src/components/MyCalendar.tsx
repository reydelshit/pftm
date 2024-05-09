import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { useEffect, useState } from 'react'

import timeGridPlugin from '@fullcalendar/timegrid'

import { EventInput } from '@fullcalendar/core'

import axios from 'axios'

const MyCalendar = ({ calendarRef }: { calendarRef: any }) => {
  const [calendar, setCalendar] = useState<EventInput[]>([])

  const user_id = localStorage.getItem('pftm_token')

  const getAppointments = async () => {
    await axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/calendar.php`)
      .then((res) => {
        setCalendar(res.data.map((appointment: EventInput[]) => appointment))
        console.log(res.data, 'stas')
      })
  }

  const fetchPigs = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/pigs.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
        }
      })
  }

  useEffect(() => {
    getAppointments()
    fetchPigs()
    // console.log(appointments, 'useeffect');
  }, [])

  return (
    <div className="h-[90%] w-[55%] ">
      {calendar.length > 0 && (
        <FullCalendar
          ref={calendarRef as any}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev, next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventBackgroundColor="purple"
          eventBorderColor="purple"
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={calendar}
        />
      )}
    </div>
  )
}

export default MyCalendar
