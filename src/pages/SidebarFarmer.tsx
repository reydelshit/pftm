import { Button } from '@/components/ui/button'
import { GrAnalytics, GrSchedules } from 'react-icons/gr'
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
    <div className="block w-[20rem] h-dvh bg-primary-yellow text-primary-red fixed z-10">
      <div className=" flex flex-col justify-between w-full h-[90%]">
        <div className="flex flex-col font-semibold px-[1rem] mt-[4rem] mb-2">
          {/* <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/' || currentPath.includes('/crops')
                ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
                : ''
            } `}
            to="/"
          >
            <GiPlantSeed className="text-md h-[1.5rem] w-[1.5rem]" />
            SCHEDULE REPORTS
          </Link> */}

          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/pig-management'
                ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
                : ''
            } `}
            to="/pig-management"
          >
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" />
            PIG MANAGEMENT
          </Link>

          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/pig-buffs'
                ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
                : ''
            } `}
            to="/pig-buffs"
          >
            <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" />
            PIG BUFFS
          </Link>
          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/generate-schedule'
                ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
                : ''
            } `}
            to="/generate-schedule"
          >
            <GrSchedules className="text-md h-[1.5rem] w-[1.5rem]" /> SCHEDULE
            GENERATION
          </Link>
          <Link
            className={`p-2 mb-2 flex items-center gap-2 text-[1.5rem] ${
              currentPath == '/reports'
                ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
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
                ? ' bg-primary-red text-primary-yellow rounded-full self-center flex justify-center w-full active:text-primary-yellow'
                : ''
            } `}
            to="/assigned-farmer"
          >
            <GrAnalytics className="text-md h-[1.5rem] w-[1.5rem]" />
            FARMERS
          </Link>
        </div>

        <div className="flex justify-center flex-col items-center mt-[2rem]">
          {/* <WeatherApi /> */}

          <Button
            className="bg-primary-yellow border-4 mt-[2rem] border-primary-red p-6 rounded-full w-[10rem] font-bold text-primary-red hover:bg-primary-red hover:text-primary-yellow transition-all duration-300 ease-in-out text-2xl"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
