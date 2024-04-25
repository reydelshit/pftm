import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Label } from '@/components/ui/label'
import { PigTypes, SchedulePigsTypes } from '@/entities/types'
import ButtonStyle from '@/lib/ButtonStyle'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import moment from 'moment'

export default function SchedulePigs() {
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

  const handleSchedPigs = (e: string) => {
    setSelectedPigs(e)
  }

  useEffect(() => {
    fetchSched()
    fetchPigs()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/sched.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...pigSchedDetails,
        user_id: user_id,
        pig_id: selectedPigs,
      })
      .then((res) => {
        if (res.data) {
          fetchSched()
          setShowAddSched(!showAddSched)
        }
        console.log(res.data)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setPigSchedDetails((values) => ({ ...values, [name]: value }))
  }

  const handleDeleteSched = (sched_id: number) => {
    axios
      .delete(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/sched.php`, {
        data: {
          sched_id: sched_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          fetchSched()
        }
      })
  }

  // const fetchUpdateScheds = (id: number) => {
  //   axios
  //     .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/scheds.php`, {
  //       params: {
  //         sched_id: id,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data) {
  //         console.log(res.data)
  //         setSchedUpdateDetails(res.data[0])

  //         setShowUpdateFormSched(true)
  //       }
  //     })
  // }
  // const handleUpdateForm = (sched_id: number) => {
  //   fetchUpdateScheds(sched_id)
  //   // setBuffUpdateID(sched_id)
  //   // console.log(buff_id)
  // }

  // const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   axios
  //     .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/Sched.php`, {
  //       sched_id: schedUpdateID,
  //       sched_name: pigSchedDetails.buff_name
  //         ? pigSchedDetails.buff_name
  //         : schedUpdateDetails?.buff_name!,
  //       buff_type: pigSchedDetails.buff_type
  //         ? pigSchedDetails.buff_type
  //         : schedUpdateDetails?.buff_type!,

  //       user_id: user_id,
  //     })
  //     .then((res) => {
  //       setShowUpdateFormBuff(false)
  //       fetchSched()
  //       console.log(res.data)
  //     })
  // }

  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...sched].sort((a, b) => {
    // Sort by crops name
    if (sortOrder === 'asc') {
      return String(a.pig_id).localeCompare(String(b.pig_id))
    } else {
      return String(b.pig_id).localeCompare(String(a.pig_id))
    }
  })

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-color">
          SET SCHEDULE
        </h1>
      </div>

      <div className="flex gap-10 w-full h-full justify-around">
        <div className="w-full h-full flex justify-between items-start ">
          <div className="w-full h-[95%] bg-primary-secondary rounded-2xl p-4 gap-2 flex justify-start items-center flex-col">
            <div className="w-full justify-between flex">
              <div>
                <Button
                  onClick={toggleSortOrder}
                  className="rounded-full h-full border-4 border-primary-color bg-primary-secondary font-bold text-xl text-primary-color hover:bg-primary-color hover:text-primary-secondary hover:border-primary-color hover:border-4"
                >
                  {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
                </Button>
              </div>

              <ButtonStyle onCLick={() => setShowAddSched(!showAddSched)}>
                SET SCHEDULE
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 border-primary-color rounded-3xl p-4">
              <Table className="w-full ">
                <TableHeader>
                  <TableRow className="text-primary-color border-b-4 border-primary-color">
                    <TableHead className="text-primary-color text-xl">
                      Sched ID.
                    </TableHead>
                    <TableHead className="text-primary-color text-xl">
                      Schedule Name
                    </TableHead>
                    <TableHead className="text-primary-color text-xl">
                      Pig Tag
                    </TableHead>

                    <TableHead className="text-primary-color text-xl">
                      Schedule Date
                    </TableHead>
                    <TableHead className="text-primary-color text-xl "></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xl ">
                  {sched.length > 0 ? (
                    sortedData.map((sched, index) => (
                      <TableRow
                        key={index}
                        className="text-primary-color border-b-4 border-primary-color"
                      >
                        {/* <TableCell>{field.sched_id}</TableCell> */}
                        <TableCell>{sched.sched_id}</TableCell>
                        <TableCell>{sched.sched_name}</TableCell>

                        <TableCell>{sched.pig_id}</TableCell>

                        <TableCell>
                          {moment(sched.sched_date).format('ll')}
                        </TableCell>

                        <TableCell className="flex gap-2">
                          {/* <FaPencilAlt
                            onClick={() => handleUpdateForm(sched.sched_id)}
                            className="p-2 text-[2.5rem] text-primary-color cursor-pointer"
                          /> */}

                          <MdDelete
                            onClick={() => handleDeleteSched(sched.sched_id)}
                            className="p-2 text-[2.5rem] text-primary-color cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-primary-color">
                      <TableCell colSpan={8} className="text-center">
                        No sched found or loading...
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {showAddSched && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-white bg-opacity-90 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-[40%] bg-primary-color p-4 rounded-lg ml-[-15rem]"
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
                onChange={handleInputChange}
              />
            </div>

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

            <div className="flex items-start w-full flex-col">
              <Label className="text-primary-secondary my-2 block">
                Schedule Date
              </Label>
              <Input
                className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-white"
                name="sched_date"
                required
                type="datetime-local"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-2 justify-end items-center">
              <Button
                onClick={() => setShowAddSched(!showAddSched)}
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

      {/* {showUpdateFormSched && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-secondary bg-opacity-90 flex justify-center items-center">
          <div className="w-[80%] flex justify-center gap-4 ml-[-15rem] p-5">
            <form
              onSubmit={handleUpdateSubmit}
              className="w-[50%] bg-primary-color p-8 rounded-lg"
            >
              <h1 className="font-bold text-2xl text-primary-secondary py-4">
                UPDATE SOIL
              </h1>
              <Label className="text-primary-secondary my-2 block">Buff Name</Label>
              <Input
                className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-primary-secondary"
                name="buff_name"
                onChange={handleInputChange}
                defaultValue={buffUpdateDetails?.buff_name}
              />

              <Label className="text-primary-secondary my-2 block">Buff Type</Label>

              <Input
                className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-primary-secondary"
                name="buff_type"
                onChange={handleInputChange}
                defaultValue={buffUpdateDetails?.buff_type}
              />

              <div className="flex gap-2 justify-end items-center">
                <Button
                  onClick={() => setShowUpdateFormBuff(false)}
                  className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-color text-primary-secondary hover:bg-primary-secondary hover:text-primary-color hover:border-primary-color"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-secondary text-primary-color hover:bg-primary-color hover:text-primary-secondary hover:border-primary-secondary"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  )
}
