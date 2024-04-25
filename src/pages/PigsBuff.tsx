import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { PigBuffTypes } from '@/entities/types'
import ButtonStyle from '@/lib/ButtonStyle'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

export default function PigsBuff() {
  const [showAddPig, setShowAddPig] = useState(false)
  const [pigBuffsDetails, setPigBuffsDetails] = useState({} as PigBuffTypes)
  const [buffs, setBuffs] = useState<PigBuffTypes[]>([])
  const [showUpdateFormBuff, setShowUpdateFormBuff] = useState(false)
  const [buffUpdateDetails, setBuffUpdateDetails] =
    useState<PigBuffTypes | null>(null)
  const [buffUpdateID, setBuffUpdateID] = useState(0)

  const [buffType, setBuffType] = useState('')

  const user_id = localStorage.getItem('cmhs_token')

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

  const handleBuffType = (e: string) => {
    setBuffType(e)
  }

  useEffect(() => {
    fetchPigsBuff()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/buffs.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...pigBuffsDetails,
        buff_type: buffType,
        user_id: user_id,
      })
      .then((res) => {
        if (res.data) {
          fetchPigsBuff()
          setShowAddPig(!showAddPig)
        }
        console.log(res.data)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setPigBuffsDetails((values) => ({ ...values, [name]: value }))
  }

  const handleDeletePig = (pig_id: number) => {
    axios
      .delete(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/pigs.php`, {
        data: {
          pig_id: pig_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          fetchPigsBuff()
        }
      })
  }

  const fetchUpdateBuffs = (id: number) => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/buffs.php`, {
        params: {
          buff_id: id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setBuffUpdateDetails(res.data[0])

          setShowUpdateFormBuff(true)
        }
      })
  }
  const handleUpdateForm = (buff_id: number) => {
    fetchUpdateBuffs(buff_id)
    setBuffUpdateID(buff_id)
    // console.log(buff_id)
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/buffs.php`, {
        buff_id: buffUpdateID,
        buff_name: pigBuffsDetails.buff_name
          ? pigBuffsDetails.buff_name
          : buffUpdateDetails?.buff_name!,
        buff_type: pigBuffsDetails.buff_type
          ? pigBuffsDetails.buff_type
          : buffUpdateDetails?.buff_type!,

        user_id: user_id,
      })
      .then((res) => {
        setShowUpdateFormBuff(false)
        fetchPigsBuff()
        console.log(res.data)
      })
  }

  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...buffs].sort((a, b) => {
    // Sort by crops name
    if (sortOrder === 'asc') {
      return a.buff_name.localeCompare(b.buff_type)
    } else {
      return b.buff_name.localeCompare(a.buff_type)
    }
  })

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-yellow">
          PIG BUFFS
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
                onCLick={() => setShowAddPig(!showAddPig)}
              >
                Add Buff
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 border-primary-yellow rounded-3xl p-4">
              <Table className="w-full ">
                <TableHeader>
                  <TableRow className="text-primary-yellow border-b-4 border-primary-yellow">
                    <TableHead className="text-primary-yellow text-xl">
                      Buff ID.
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl">
                      Buff Name
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl">
                      Buff Type
                    </TableHead>

                    <TableHead className="text-primary-yellow text-xl">
                      Created At
                    </TableHead>
                    <TableHead className="text-primary-yellow text-xl w-[10rem]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xl ">
                  {buffs.length > 0 ? (
                    sortedData.map((buff, index) => (
                      <TableRow
                        key={index}
                        className="text-primary-yellow border-b-4 border-primary-yellow"
                      >
                        {/* <TableCell>{field.buff_id}</TableCell> */}
                        <TableCell>{buff.buff_id}</TableCell>
                        <TableCell>{buff.buff_name}</TableCell>

                        <TableCell>{buff.buff_type}</TableCell>

                        <TableCell>
                          {moment(buff.created_at).format('ll')}
                        </TableCell>

                        <TableCell className="flex gap-2">
                          <FaPencilAlt
                            onClick={() => handleUpdateForm(buff.buff_id)}
                            className="p-2 text-[2.5rem] text-primary-yellow cursor-pointer"
                          />

                          <MdDelete
                            onClick={() => handleDeletePig(buff.buff_id)}
                            className="p-2 text-[2.5rem] text-primary-yellow cursor-pointer"
                          />
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

      {showAddPig && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-[40%] bg-primary-yellow p-4 rounded-lg"
          >
            <h1 className="font-bold text-2xl text-primary-red py-4">
              ADD PIG
            </h1>

            <div className="flex items-center gap-4 w-full ">
              <Select required onValueChange={(e: string) => handleBuffType(e)}>
                <SelectTrigger className="w-full h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
                  <SelectValue placeholder="Buff type.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medication">Medication</SelectItem>
                  <SelectItem value="Vitamins">Vitamins</SelectItem>
                </SelectContent>
              </Select>

              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-white"
                placeholder="Buff name"
                name="buff_name"
                required
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-2 justify-end items-center">
              <Button
                onClick={() => setShowAddPig(!showAddPig)}
                className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-yellow text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-red text-primary-yellow hover:bg-primary-yellow hover:text-primary-red hover:border-primary-red"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      )}

      {showUpdateFormBuff && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
          <div className="w-[80%] flex justify-center gap-4 ml-[-15rem] p-5">
            <form
              onSubmit={handleUpdateSubmit}
              className="w-[50%] bg-primary-yellow p-8 rounded-lg"
            >
              <h1 className="font-bold text-2xl text-primary-red py-4">
                UPDATE SOIL
              </h1>
              <Label className="text-primary-red my-2 block">Buff Name</Label>
              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
                name="buff_name"
                onChange={handleInputChange}
                defaultValue={buffUpdateDetails?.buff_name}
              />

              <Label className="text-primary-red my-2 block">Buff Type</Label>

              <Input
                className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
                name="buff_type"
                onChange={handleInputChange}
                defaultValue={buffUpdateDetails?.buff_type}
              />

              <div className="flex gap-2 justify-end items-center">
                <Button
                  onClick={() => setShowUpdateFormBuff(false)}
                  className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-yellow text-primary-red hover:bg-primary-red hover:text-primary-yellow hover:border-primary-yellow"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-red text-primary-yellow hover:bg-primary-yellow hover:text-primary-red hover:border-primary-red"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
