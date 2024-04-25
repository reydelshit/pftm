import { AssignedFarmerTypes, PigBuffTypes, PigTypes } from '@/entities/types'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Dashboard() {
  const [pigData, setPigData] = useState<PigTypes[]>([])
  const [buffs, setBuffs] = useState<PigBuffTypes[]>([])
  const [farmer, setFarmer] = useState<AssignedFarmerTypes[]>([])

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

  useEffect(() => {
    Promise.all([fetchPigs(), fetchPigsBuff(), fetchFarmer()])
  }, [])

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-color">
          DASHBOARD
        </h1>
      </div>

      <div className="w-full flex gap-4">
        <div className="w-[22rem] p-4 h-[10rem] border-2 rounded-2xl bg-primary-color text-white font-bold">
          <span className="block">NUMBER OF PIGS</span>

          <h1 className="text-[4rem] font-bold text-center">
            {pigData.length}
          </h1>
        </div>

        <div className="w-[22rem] p-4 h-[10rem] border-2 rounded-2xl bg-primary-color text-white font-bold">
          <span className="block">NUMBER OF PIGS BUFF</span>

          <h1 className="text-[4rem] font-bold text-center">{buffs.length}</h1>
        </div>

        <div className="w-[22rem] p-4 h-[10rem] border-2 rounded-2xl bg-primary-color text-white font-bold">
          <span className="block">NUMBER OF FARMERS</span>

          <h1 className="text-[4rem] font-bold text-center">{farmer.length}</h1>
        </div>

        <div className="w-[22rem] p-4 h-[10rem] border-2 rounded-2xl bg-primary-color text-white font-bold">
          <span className="block">NUMBER OF SOW PIGS</span>

          <h1 className="text-[4rem] font-bold text-center">
            {pigData.filter((pig) => pig.pig_type === 'Sow').length}
          </h1>
        </div>
      </div>

      <div className="w-[100%] min-h-[50%] border-4 border-primary-color rounded-3xl p-4 my-[4rem] block">
        <Table className="w-full ">
          <TableHeader>
            <TableRow className="text-primary-color border-b-4 border-primary-color">
              <TableHead className="text-primary-color text-xl">hays</TableHead>
              <TableHead className="text-primary-color text-xl">hays</TableHead>
              <TableHead className="text-primary-color text-xl">hays</TableHead>

              <TableHead className="text-primary-color text-xl">hays</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xl "></TableBody>
        </Table>
      </div>
    </div>
  )
}
