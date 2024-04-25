import { Button } from '@/components/ui/button'
import { GiFarmer, GiLoveInjection } from 'react-icons/gi'
import { GrAnalytics, GrScheduleNew } from 'react-icons/gr'
import { LuPiggyBank } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const currentPath = useLocation().pathname

  const handleLogout = () => {
    localStorage.removeItem('cmhs_token')
    localStorage.removeItem('cmhs_account_type')
    window.location.reload()
  }
  return (
    <div className="block w-[20rem] h-dvh bg-primary-color text-primary-secondary fixed z-10">
      <div className=" flex flex-col justify-between w-full h-[90%]">
        <div className="flex flex-col font-semibold px-[1rem] mt-[4rem] mb-2">
          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/dashboard'
                ? ' bg-primary-secondary text-primary-color rounded-full self-center flex justify-center w-full active:text-primary-color'
                : ''
            } `}
            to="/dashboard"
          >
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" />
            DASHBOARD
          </Link>
          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/pig-management'
                ? ' bg-primary-secondary text-primary-color rounded-full self-center flex justify-center w-full active:text-primary-color'
                : ''
            } `}
            to="/pig-management"
          >
            <LuPiggyBank className="text-md h-[1.5rem] w-[1.5rem]" />
            PIG MANAGEMENT
          </Link>

          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/pig-buffs'
                ? ' bg-primary-secondary text-primary-color rounded-full self-center flex justify-center w-full active:text-primary-color'
                : ''
            } `}
            to="/pig-buffs"
          >
            <GiLoveInjection className="text-md h-[1.5rem] w-[1.5rem]" />
            PIG BUFFS
          </Link>
          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/generate-schedule'
                ? ' bg-primary-secondary text-primary-color rounded-full self-center flex justify-center w-full active:text-primary-color'
                : ''
            } `}
            to="/generate-schedule"
          >
            <GrScheduleNew className="text-md h-[1.5rem] w-[1.5rem]" /> SCHEDULE
            GENERATION
          </Link>
          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/reports'
                ? ' bg-primary-secondary text-primary-color rounded-full self-center flex justify-center w-full active:text-primary-color'
                : ''
            } `}
            to="/reports"
          >
            <GrAnalytics className="text-md h-[1.5rem] w-[1.5rem]" /> LIVESTOCKS
            REPORTS
          </Link>

          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/assigned-farmer'
                ? ' bg-primary-secondary text-primary-color rounded-full self-center flex justify-center w-full active:text-primary-color'
                : ''
            } `}
            to="/assigned-farmer"
          >
            <GiFarmer className="text-md h-[1.5rem] w-[1.5rem]" />
            FARMERS
          </Link>
        </div>

        <div className="flex justify-center flex-col items-center mt-[2rem]">
          {/* <WeatherApi /> */}

          <Button
            className="bg-primary-color border-4 mt-[2rem] border-primary-secondary p-6 rounded-full w-[10rem] font-bold text-primary-secondary hover:bg-primary-secondary hover:text-primary-color transition-all duration-300 ease-in-out text-2xl"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
