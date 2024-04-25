import { Button } from '@/components/ui/button'
import { PigTypes } from '@/entities/types'
import ButtonStyle from '@/lib/ButtonStyle'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AddPigForm from './pig-management/AddPigForm'
import PigManagementTable from './pig-management/PigManagementTable'
import UpdateForm from './pig-management/UpdateForm'

export default function PigsManagement() {
  const [showAddPig, setShowAddPig] = useState(false)
  const [pigDetails, setPigDetails] = useState({} as PigTypes)
  const [pigData, setPigData] = useState<PigTypes[]>([])
  const [showUpdateFormPig, setShowUpdateFormPig] = useState(false)
  const [pigUpdateDetails, setPigUpdateDetails] = useState<PigTypes | null>(
    null,
  )
  const [fieldUpdateID, setFieldUpdateID] = useState(0)
  const [selectedFarmer, setSelectedFarmer] = useState('')
  const [latestEartag, setLatestEartag] = useState(0)
  const [building, setBuilding] = useState('' as string)
  const [pigType, setPigType] = useState('' as string)
  const [selectedBuff, setSelectedBuff] = useState('' as string)
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

  const handleSlectedBuff = (e: string) => {
    setSelectedBuff(e)
  }

  const hanldePigType = (e: string) => {
    setPigType(e)
  }

  const handleBuilding = (e: string) => {
    setBuilding(e)
  }

  const handleSelectedFarmer = (e: string) => {
    setSelectedFarmer(e)
  }

  useEffect(() => {
    fetchPigs()
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .post(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/pigs.php`, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...pigDetails,
        building: building,
        assigned_farmer: selectedFarmer,
        user_id: user_id,
        pig_type: pigType,
        date_breed: pigDetails.date_breed ? pigDetails.date_breed : '',
        pig_tag: latestEartag,
        buff_id: selectedBuff,
      })
      .then((res) => {
        if (res.data) {
          fetchPigs()
          setShowAddPig(!showAddPig)
        }
        console.log(res.data)
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setPigDetails((values) => ({ ...values, [name]: value }))
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
          fetchPigs()
        }
      })
  }

  const fetchUpdateFieldData = (id: number) => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/pigs.php`, {
        params: {
          pig_id: id,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setPigUpdateDetails(res.data[0])

          setShowUpdateFormPig(true)
        }
      })
  }
  const handleUpdateForm = (field_id: number) => {
    fetchUpdateFieldData(field_id)
    setFieldUpdateID(field_id)
  }

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios
      .put(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/pigs.php`, {
        pig_id: fieldUpdateID,
        pig_tag: pigDetails.pig_tag
          ? pigDetails.pig_tag
          : pigUpdateDetails?.pig_tag!,
        building: pigDetails.building
          ? pigDetails.building
          : pigUpdateDetails?.building!,
        pen: pigDetails.pen ? pigDetails.pen : pigUpdateDetails?.pen!,
        assigned_farmer: pigDetails.assigned_farmer
          ? pigDetails.assigned_farmer
          : pigUpdateDetails?.assigned_farmer!,
        short_desc: pigDetails.short_desc
          ? pigDetails.short_desc
          : pigUpdateDetails?.short_desc!,
        pig_type: pigDetails.pig_type
          ? pigDetails.pig_type
          : pigUpdateDetails?.pig_type!,

        user_id: user_id,
      })
      .then((res) => {
        setShowUpdateFormPig(false)
        fetchPigs()
        console.log(res.data)
      })
  }

  const [sortOrder, setSortOrder] = useState('asc')

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
  }

  const sortedData = [...pigData].sort((a, b) => {
    // Sort by crops name
    if (sortOrder === 'asc') {
      return a.pig_tag.localeCompare(b.pig_tag)
    } else {
      return b.pig_tag.localeCompare(a.pig_tag)
    }
  })

  return (
    <div className="w-full h-dvh flex items-start flex-col pl-[20rem] relative">
      <div className="my-[2.5rem] flex justify-between items-center w-full">
        <h1 className="text-[5rem] font-semibold text-primary-color">
          PIG MANAGEMENT
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

              <ButtonStyle onCLick={() => setShowAddPig(!showAddPig)}>
                Add Pig
              </ButtonStyle>
            </div>
            <div className="w-[100%] min-h-[80%] border-4 border-primary-color rounded-3xl p-4">
              <PigManagementTable
                sortedData={sortedData}
                pigData={pigData}
                handleUpdateForm={handleUpdateForm}
                handleDeletePig={handleDeletePig}
              />
            </div>
          </div>
        </div>
      </div>

      {showAddPig && (
        <AddPigForm
          handleBuilding={handleBuilding}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setShowAddPig={setShowAddPig}
          showAddPig={showAddPig}
          handleSelectedFarmer={handleSelectedFarmer}
          hanldePigType={hanldePigType}
          pigType={pigType}
          setLatestEartag={setLatestEartag}
          handleSlectedBuff={handleSlectedBuff}
        />
      )}

      {showUpdateFormPig && (
        <UpdateForm
          handleInputChange={handleInputChange}
          setShowUpdateFormPig={setShowUpdateFormPig}
          pigUpdateDetails={pigUpdateDetails}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  )
}
