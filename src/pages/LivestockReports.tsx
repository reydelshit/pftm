import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  AssignedFarmerTypes,
  PigBuffTypes,
  PigTypes,
  SchedulePigsTypes,
} from '@/entities/types'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
type SchedFarmer = {
  sched_id: number
  sched_name: string
  pig_id: string
  sched_date: string
  created_at: string
  user_id: string
  assigned_farmer: string
  category: string
}

export default function LivestockReports() {
  const [pigData, setPigData] = useState<PigTypes[]>([])
  const [buffs, setBuffs] = useState<PigBuffTypes[]>([])
  const [farmer, setFarmer] = useState<AssignedFarmerTypes[]>([])

  const [schedFarmer, setSchedFarmer] = useState<SchedFarmer[]>([])
  const [monthlyFarrowing, setMonthlyFarrowing] = useState([])
  const [sched, setSched] = useState<SchedulePigsTypes[]>([])

  const user_id = localStorage.getItem('pftm_token')

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

  const fetchPigsBuff = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/buffs.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setBuffs(res.data)
        }
      })
  }

  const fetchFarmer = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/farmer.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setFarmer(res.data)
        }
      })
  }

  const fetchSched = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/sched.php`, {
        params: {
          user_id: user_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setSched(res.data)
        }
      })
  }

  const fetchMonthlyFarrowing = async () => {
    await axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/graphs.php`, {
        params: {
          farrowing: true,
        },
      })
      .then((res) => {
        console.log(res.data, 'sss')
        setMonthlyFarrowing(res.data)
      })
  }

  useEffect(() => {
    Promise.all([
      fetchPigs(),
      fetchPigsBuff(),
      fetchFarmer(),
      fetchSched(),
      fetchMonthlyFarrowing(),
    ])
  }, [])

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-color">
          LIVE STOCK REPORTS
        </h1>
      </div>

      <div className="flex gap-10 w-full h-full justify-around">
        <div className="w-full h-full flex justify-between items-start ">
          <div className="w-full h-[95%] bg-primary-secondary rounded-2xl p-4 gap-2 flex justify-start items-center flex-col">
            <div className="w-full justify-between flex">
              {/* <ButtonStyle
                background="color"
                onCLick={() => setShowAddSched(!showAddSched)}
              >
                Add Buff
              </ButtonStyle> */}
            </div>

            <div className="w-full flex gap-4">
              <div className="w-full p-4 h-[10rem] border-2 rounded-2xl bg-primary-color text-white font-bold">
                <span className="block">NUMBER OF SELL PIGS</span>

                <h1 className="text-[4rem] font-bold text-center">
                  {sched.filter((pig) => pig.category === 'Sell').length}
                </h1>
              </div>

              <div className="w-full p-4 h-[10rem] border-2 rounded-2xl bg-primary-color text-white font-bold">
                <span className="block">NUMBER OF SLAUGHTERED PIGS</span>

                <h1 className="text-[4rem] font-bold text-center">
                  {sched.filter((pig) => pig.category === 'Slaughter').length}
                </h1>
              </div>

              <div className="w-full p-4 h-[10rem] border-2 rounded-2xl bg-primary-color text-white font-bold">
                <span className="block">NUMBER OF BREEDING PIGS</span>

                <h1 className="text-[4rem] font-bold text-center">
                  {sched.filter((pig) => pig.category === 'Breeding').length}
                </h1>
              </div>
            </div>

            <div className="flex justify-between items-start mt-[2rem] w-full">
              <div className="w-[30%]">
                <div className="border-2 bg-primary-color text-white rounded-lg p-4">
                  <h1 className="uppercase font-semibold text-2xl ">
                    total pigs
                  </h1>

                  <div className="ml-[1.5rem] my-2">
                    <div className="flex gap-4 items-center mb-2">
                      <h1 className="uppercase font-semibold w-[5rem]">sow</h1>
                      <p className="bg-white text-primary-color p-2 rounded-md w-[30%] text-center font-bold">
                        {pigData.filter((pig) => pig.pig_type === 'Sow').length}
                      </p>
                    </div>

                    <div className="flex gap-4 items-center">
                      <h1 className="uppercase font-semibold w-[5rem]">boar</h1>
                      <p className="bg-white text-primary-color p-2 rounded-md w-[30%] text-center font-bold">
                        {
                          pigData.filter((pig) => pig.pig_type === 'Boar')
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-[1.5rem] bg-primary-color text-primary-secondary p-4 rounded-lg">
                  <h1 className="uppercase font-semibold text-2xl break-words w-full">
                    recently added pigs & their buffs
                  </h1>

                  <div>
                    <Table className="w-full ">
                      <TableHeader>
                        <TableRow className="text-primary-secondary border-b-4 border-secontext-primary-secondary">
                          <TableHead className="text-primary-secondary text-xl">
                            PIG TAG
                          </TableHead>
                          <TableHead className="text-primary-secondary text-xl">
                            Buff Name
                          </TableHead>
                          <TableHead className="text-primary-secondary text-xl">
                            Buff type
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="text-xl ">
                        {pigData
                          .map((pig, index) => (
                            <TableRow
                              className="text-white border-b-4 border-primary-color"
                              key={index}
                            >
                              <TableCell className="font-bold text-2xl">
                                {pig.pig_tag}
                              </TableCell>
                              <TableCell>{pig.buff_name}</TableCell>
                              <TableCell>{pig.buff_type}</TableCell>
                            </TableRow>
                          ))
                          .slice(0, 3)}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              <div className="w-[65%]">
                <h1 className="uppercase font-semibold text-2xl">
                  breeding/reproduction status
                </h1>

                <div className="flex gap-4 items-center my-2 bg-primary-color text-white p-4 rounded-md font-semibold">
                  <h1>Pregnancy status</h1>
                  <p className="bg-white text-primary-color rounded-md p-2">
                    {(
                      (pigData.filter(
                        (pig) =>
                          pig.pig_type === 'Sow' &&
                          new Date(pig.date_breed) <= new Date(),
                      ).length /
                        pigData.filter((pig) => pig.pig_type === 'Sow')
                          .length) *
                      100
                    ).toFixed(2)}
                    % of sows are pregnant out of{' '}
                    {pigData.filter((pig) => pig.pig_type === 'Sow').length}.
                  </p>
                </div>

                <div className="w-full rounded-lg border-2 bg-primary-color text-white md:p-5">
                  <h1 className="mb-5 font-bold uppercase">
                    GRAPH FOR EXPECTED FARROWING MONTHLY
                  </h1>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={monthlyFarrowing}>
                      <XAxis
                        dataKey="name"
                        stroke="white"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="white"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value: string) => `${value}`}
                      />
                      <Bar dataKey="total" fill="white" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
