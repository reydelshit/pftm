import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DateSelectArg,
  EventApi,
  EventChangeArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import { useEffect, useRef, useState } from 'react'

import timeGridPlugin from '@fullcalendar/timegrid'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EventInput } from '@fullcalendar/core'

import { PigTypes, SchedulePigsTypes } from '@/entities/types'
import axios from 'axios'

import MyCalendar from '@/components/MyCalendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import ButtonStyle from '@/lib/ButtonStyle'
import { useReactToPrint } from 'react-to-print'

export default function ScheduleNew() {
  const [state, setState] = useState({
    weekendsVisible: true,
    currentEvents: [],
  }) as any

  const [pigSchedDetails, setPigSchedDetails] = useState(
    {} as SchedulePigsTypes,
  )
  const [addCalendar, setAddCalendar] = useState(false)
  const [title, setTitle] = useState('' as any)
  const [selectInfo, setSelectInfo] = useState({} as any)
  const [calendar, setCalendar] = useState<EventInput[]>([])
  const [pigData, setPigData] = useState<PigTypes[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPigs, setSelectedPigs] = useState('')
  const [searchPigs, setSearchPigs] = useState('')

  const user_id = localStorage.getItem('pftm_token')

  const calendarRef = useRef()

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
          setPigData(res.data)
        }
      })
  }

  useEffect(() => {
    getAppointments()
    fetchPigs()
    // console.log(appointments, 'useeffect');
  }, [])

  const selectDate = (selectInfo: DateSelectArg) => {
    console.log(selectInfo)

    setSelectInfo(selectInfo)
    setAddCalendar(true)
  }

  const handleSchedPigs = (e: string) => {
    setSelectedPigs(e)
  }

  const handleCategory = (e: string) => {
    setSelectedCategory(e)
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect()
    if (title) {
      calendarApi.addEvent({
        title: title + ' - ' + selectedPigs,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })

      // console.log(selectInfo)

      axios
        .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/calendar.php`, {
          ...pigSchedDetails,

          calendar_title: title + ' - ' + selectedPigs,
          pig_tag: selectedPigs,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          account_id: user_id,

          sched_date: selectInfo.startStr,
          sched_name: title,
          user_id: user_id,
          pig_id: selectedPigs,
          category: selectedCategory,
        })
        .then((res) => {
          console.log(res.data)
          getAppointments()
        })

      getAppointments()
      setAddCalendar(false)

      //   axios
      //     .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/calendar.php`, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     })
      //     .then((res) => {
      //       if (res.data) {
      //         getAppointments()
      //       }
      //       console.log(res.data)
      //     })
    }
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo.event.id)
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      axios
        .delete(
          `${import.meta.env.VITE_CMHS_LOCAL_HOST}/calendar.php/${
            clickInfo.event.id
          }`,
        )
        .then((res) => {
          console.log(res.data)
        })

      axios
        .delete(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/sched.php`, {
          data: {
            event_id: clickInfo.event.id,
          },
        })
        .then((res) => {
          if (res.data) {
            console.log(res.data)
          }
        })

      clickInfo.event.remove()
    }
  }

  const handleChangeAppointment = (eventChange: EventChangeArg) => {
    console.log(eventChange.event.title)

    const text = eventChange.event.title

    const removeIT = text.replace(/(\d+).*/, '$1')

    axios
      .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/calendar.php`, {
        calendar_id: eventChange.event.id,
        calendar_title: removeIT,
        start: eventChange.event.startStr,
        end: eventChange.event.endStr,
        allDay: eventChange.event.allDay,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  const handleAppointments = (events: EventApi[]) => {
    setState({
      currentEvents: events,
    })
  }

  const renderSidebar = () => {
    return (
      <div className="w-[20rem] ">
        <Card className="mb-2 w-full">
          <CardHeader>
            <CardTitle className="text-lg">Instructions</CardTitle>
          </CardHeader>
          <CardContent className="text-md">
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </CardContent>
        </Card>

        <div className="rounded-md border-2 p-2 text-sm">
          <span className="block text-base font-semibold">
            All Schedules ({state.currentEvents.length})
          </span>
          <span className="text-md">
            {state.currentEvents.map(renderSidebarEvent)}
          </span>
        </div>
      </div>
    )
  }

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    )
  }

  const renderSidebarEvent = (event: EventApi) => {
    return (
      <div className="flex gap-1" key={event.id}>
        <span>
          {formatDate(event.start!, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
        <p className="font-bold">{event.title}</p>
      </div>
    )
  }

  const handlePrint = useReactToPrint({
    content: () => calendarRef.current || null,
  })

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-color">
          SET SCHEDULE
        </h1>
      </div>

      <div className="w-full justify-end flex my-2">
        <ButtonStyle onCLick={handlePrint}> Print </ButtonStyle>
      </div>

      {addCalendar && (
        <div className="absolute z-20 my-auto flex h-full w-full justify-center items-center bg-white bg-opacity-90 p-2 ">
          <form
            onSubmit={() => handleDateSelect(selectInfo)}
            className="w-[40%] bg-primary-color p-4 rounded-lg ml-[-15rem] h-fit"
          >
            <h1 className="font-bold text-2xl text-primary-secondary py-4">
              SET SCHEDULE
            </h1>

            <div className="flex items-start w-full flex-col">
              <Label className="text-primary-secondary my-2 block">
                Sched Name
              </Label>
              <Input
                className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-white"
                name="sched_name"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <Select required onValueChange={(e: string) => handleCategory(e)}>
              <SelectTrigger className="w-full h-[4rem] bg-primary-secondary text-primary-color border-4 border-primary-color font-bold rounded-full">
                <SelectValue placeholder="Category.." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sell">Sell</SelectItem>
                <SelectItem value="Slaughter">Slaughter</SelectItem>
                <SelectItem value="Breeding">Breeding</SelectItem>
              </SelectContent>
            </Select>

            <Select required onValueChange={(e: string) => handleSchedPigs(e)}>
              <SelectTrigger className="w-full h-[4rem] bg-primary-secondary text-primary-color border-4 border-primary-color font-bold rounded-full">
                <SelectValue placeholder="Search pigs.." />
              </SelectTrigger>
              <SelectContent>
                <Input
                  onChange={(e) => setSearchPigs(e.target.value)}
                  placeholder="search pig"
                />

                {pigData
                  .filter((pig) => pig.pig_tag.includes(searchPigs))
                  .map((pig, index) => (
                    <SelectItem key={index} value={String(pig.pig_tag)}>
                      {pig.pig_tag}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2 justify-end items-center my-2">
              <Button
                onClick={() => setAddCalendar(false)}
                className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-color text-primary-secondary hover:bg-primary-secondary hover:text-primary-color hover:border-primary-color"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-secondary text-primary-color hover:bg-primary-color hover:text-primary-secondary hover:border-primary-secondary"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="flex h-full w-full  gap-4">
        {/* {renderSidebar()} */}

        <div className="h-[90%] w-[100%] ">
          {calendar.length > 0 ? (
            <FullCalendar
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
              select={selectDate}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              eventsSet={handleAppointments}
              eventChange={handleChangeAppointment}
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-4xl text-primary-color">No Schedule</h1>
            </div>
          )}
        </div>
        <div
          className="h-[90%] w-[82%]"
          style={{ position: 'absolute', left: '-9999px', marginTop: '2rem' }}
        >
          <MyCalendar calendarRef={calendarRef} />
        </div>
      </div>
    </div>
  )
}
