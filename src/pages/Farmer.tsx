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

import { Label } from '@/components/ui/label'
import { AssignedFarmerTypes } from '@/entities/types'
import ButtonStyle from '@/lib/ButtonStyle'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { FaPencilAlt } from 'react-icons/fa'
import moment from 'moment'

export default function Farmer() {
  const [showAddSched, setShowAddSched] = useState(false)
  const [farmerDetails, setFarmerDetails] = useState({} as AssignedFarmerTypes)
  const [farmer, setFarmer] = useState<AssignedFarmerTypes[]>([])
  const [showUpdateFarmer, setShowUpdateFarmer] = useState(false)
  const [farmerUpdateDetails, setFarmerUpdateDetails] =
    useState<AssignedFarmerTypes | null>(null)
  const [farmerID, setFarmerID] = useState(0)

  const user_id = localStorage.getItem('pftm_token')

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
    fetchFarmer()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/farmer.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...farmerDetails,
        user_id: user_id,
        no_assigned_pigs: 0,
      })
      .then((res) => {
        if (res.data) {
          fetchFarmer()
          setShowAddSched(!showAddSched)
        }
        console.log(res.data)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setFarmerDetails((values) => ({ ...values, [name]: value }))
  }

  const handleDeleteFarmer = (sched_id: number) => {
    axios
      .delete(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/sched.php`, {
        data: {
          sched_id: sched_id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          fetchFarmer()
        }
      })
  }

  const fetchUpdateScheds = (id: number) => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/farmer.php`, {
        params: {
          farmer_id: id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setFarmerUpdateDetails(res.data[0])

          setShowUpdateFarmer(true)
        }
      })
  }
  const handleUpdateForm = (farmer_id: number) => {
    fetchUpdateScheds(farmer_id)
    setFarmerID(farmer_id)
    console.log(farmer_id)
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/farmer.php`, {
        farmer_id: farmerID,

        farmer_name: farmerDetails?.farmer_name
          ? farmerDetails.farmer_name
          : farmerUpdateDetails?.farmer_name!,

        user_id: user_id,
      })
      .then((res) => {
        setShowUpdateFarmer(false)
        fetchFarmer()
        console.log(res.data)
      })
  }

  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...farmer].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.farmer_name.localeCompare(b.farmer_name)
    } else {
      return b.farmer_name.localeCompare(a.created_at)
    }
  })

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-color">
          LIST OF FARMERS
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
                Add Farmer
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 border-primary-color rounded-3xl p-4">
              <Table className="w-full ">
                <TableHeader>
                  <TableRow className="text-primary-color border-b-4 border-primary-color">
                    <TableHead className="text-primary-color text-xl">
                      Employee ID
                    </TableHead>
                    <TableHead className="text-primary-color text-xl">
                      Employee Name
                    </TableHead>
                    <TableHead className="text-primary-color text-xl">
                      No. Assigned Pigs
                    </TableHead>

                    <TableHead className="text-primary-color text-xl">
                      Created At
                    </TableHead>
                    <TableHead className="text-primary-color text-xl "></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xl ">
                  {farmer.length > 0 ? (
                    sortedData.map((farm, index) => (
                      <TableRow
                        key={index}
                        className="text-primary-color border-b-4 border-primary-color"
                      >
                        {/* <TableCell>{field.farm_id}</TableCell> */}
                        <TableCell>{farm.farmer_id}</TableCell>
                        <TableCell>{farm.farmer_name}</TableCell>

                        <TableCell>{farm.no_assigned_pigs}</TableCell>

                        <TableCell>
                          {moment(farm.created_at).format('ll')}
                        </TableCell>

                        <TableCell className="flex gap-2">
                          <FaPencilAlt
                            onClick={() => handleUpdateForm(farm.farmer_id)}
                            className="p-2 text-[2.5rem] text-primary-color cursor-pointer"
                          />

                          <MdDelete
                            onClick={() => handleDeleteFarmer(farm.farmer_id)}
                            className="p-2 text-[2.5rem] text-primary-color cursor-pointer"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-primary-color">
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

      {showAddSched && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-white bg-opacity-90 flex justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-[40%] bg-primary-color p-4 rounded-lg ml-[-15rem]"
          >
            <h1 className="font-bold text-2xl text-primary-secondary py-4">
              Add Farmer
            </h1>

            <div className="flex items-start w-full flex-col">
              <Label className="text-primary-secondary my-2 block">
                Farmer Name
              </Label>
              <Input
                className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-white"
                name="farmer_name"
                required
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

      {showUpdateFarmer && (
        <div className="absolute w-[100%] h-full top-0 z-50 bg-white bg-opacity-90 flex justify-center items-center">
          <div className="w-[80%] flex justify-center gap-4 ml-[-15rem] p-5">
            <form
              onSubmit={handleUpdateSubmit}
              className="w-[50%] bg-primary-color p-8 rounded-lg"
            >
              <h1 className="font-bold text-2xl text-primary-secondary py-4">
                UPDATE SOIL
              </h1>
              <Label className="text-primary-secondary my-2 block">
                Farmer Name
              </Label>
              <Input
                className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-primary-secondary"
                name="farmer_name"
                onChange={handleInputChange}
                defaultValue={farmerUpdateDetails?.farmer_name}
              />

              <div className="flex gap-2 justify-end items-center">
                <Button
                  onClick={() => setShowUpdateFarmer(false)}
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
      )}
    </div>
  )
}
