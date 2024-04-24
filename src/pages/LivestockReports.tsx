import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { PigTypes, SchedulePigsTypes } from '@/entities/types'
import ButtonStyle from '@/lib/ButtonStyle'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function LivestockReports() {
  const [showAddSched, setShowAddSched] = useState(false)
  const [pigSchedDetails, setPigSchedDetails] = useState(
    {} as SchedulePigsTypes,
  )
  const [sched, setSched] = useState<SchedulePigsTypes[]>([])
  // const [showUpdateFormSched, setShowUpdateFormSched] = useState(false)
  // const [schedUpdateDetails, setSchedUpdateDetails] =
  //   useState<PigBuffTypes | null>(null)
  // const [schedUpdateID, setSchedUpdateID] = useState(0)
  const [pigData, setPigData] = useState<PigTypes[]>([])

  const [selectedPigs, setSelectedPigs] = useState('')
  const [searchPigs, setSearchPigs] = useState('')

  const user_id = localStorage.getItem('cmhs_token')

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

  const handleSchedPigs = (e: string) => {
    setSelectedPigs(e)
  }

  useEffect(() => {
    fetchPigs()
  }, [])

  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...sched].sort((a, b) => {
    // Sort by crops name
    if (sortOrder === 'asc') {
      return a.sched_name.localeCompare(b.sched_date)
    } else {
      return b.sched_name.localeCompare(a.sched_date)
    }
  })

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          LIVE STOCK REPORTS
        </h1>
      </div>

      <div className="flex gap-10 w-full h-full justify-around">
        <div className="w-full h-full flex justify-between items-start ">
          <div className="w-full h-[95%] bg-primary-red rounded-2xl p-4 gap-2 flex justify-start items-center flex-col">
            <div className="w-full justify-between flex">
              <div>
                <Button
                  onClick={toggleSortOrder}
                  className="rounded-full h-full border-4 border-primary-yellow bg-primary-red font-bold text-xl text-primary-yellow hover:bg-primary-yellow hover:text-primary-red hover:border-primary-yellow hover:border-4"
                >
                  {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                </Button>
              </div>

              <ButtonStyle
                background="yellow"
                onCLick={() => setShowAddSched(!showAddSched)}
              >
                Add Buff
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 border-primary-yellow rounded-3xl p-4">
              <Table className="w-full ">
                <TableHeader>
                  <TableRow className="text-primary-yellow border-b-4 border-primary-yellow">
                    <TableHead className="text-primary-yellow text-xl">
                      Date
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl">
                      Pigs
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl">
                      Pig Farmer
                    </TableHead>

                    <TableHead className="text-primary-yellow text-xl">
                      Sales
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl "></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xl ">
                  {sched.length > 0 ? (
                    sortedData.map((sched, index) => (
                      <TableRow
                        key={index}
                        className="text-primary-yellow border-b-4 border-primary-yellow"
                      >
                        {/* <TableCell>{field.sched_id}</TableCell> */}
                        <TableCell>{sched.sched_id}</TableCell>
                        <TableCell>{sched.sched_name}</TableCell>

                        <TableCell>{sched.pig_id}</TableCell>

                        <TableCell>{sched.sched_date}</TableCell>

                        <TableCell className="flex gap-2">
                          {/* <FaPencilAlt
                            onClick={() => handleUpdateForm(sched.sched_id)}
                            className="p-2 text-[2.5rem] text-primary-yellow cursor-pointer"
                          /> */}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-primary-yellow">
                      <TableCell colSpan={8} className="text-center">
                        No field found or loading...
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
