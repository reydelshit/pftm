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
import { AssignedFarmerTypes, PigBuffTypes } from '@/entities/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

type AddFieldFomProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showAddPig: boolean
  setShowAddPig: (e: boolean) => void
  handleSlectedBuff: (e: string) => void
  handleBuilding: (e: string) => void
  handleSelectedFarmer: (e: string) => void
  hanldePigType: (e: string) => void
  pigType: string
  setLatestEartag: (e: number) => void
}

export default function AddPigForm({
  handleSubmit,
  handleInputChange,
  showAddPig,
  setShowAddPig,
  handleSelectedFarmer,
  handleBuilding,
  hanldePigType,
  pigType,
  setLatestEartag,
  handleSlectedBuff,
}: AddFieldFomProps) {
  const [farmer, setFarmer] = useState<AssignedFarmerTypes[]>([])
  const [searchFarmer, setSearchFarmer] = useState('')
  const [searchBuff, setSearchBuff] = useState('')
  const [buffs, setBuffs] = useState<PigBuffTypes[]>([])
  const [eartags, setEartags] = useState(0)

  const user_id = localStorage.getItem('pftm_token')

  const fetchPigs = () => {
    axios
      .get(`${import.meta.env.VITE_CMHS_LOCAL_HOST}/pigs.php`, {
        params: {
          user_id: user_id,
          latest_eartag: true,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          setEartags(res.data[0].latest_eartag)

          if (res.data[0].latest_eartag) {
            setLatestEartag(parseInt(String(res.data[0].latest_eartag)) + 1)
          }
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

  useEffect(() => {
    fetchFarmer()
    fetchPigs()
    fetchPigsBuff()
  }, [])

  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-white bg-opacity-90 flex justify-center items-center text-white">
      <form
        onSubmit={handleSubmit}
        className="w-[40%] bg-primary-color p-4 rounded-lg ml-[-5rem]"
      >
        <h1 className="font-bold text-2xl text-primary-secondary py-4">
          ADD PIG
        </h1>
        <Input
          className="mb-2 h-[8rem] border-4 text-center border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-white font-bold text-[5rem]"
          placeholder="Pig Tag Number"
          name="pig_tag"
          required
          value={parseInt(String(eartags)) + 1}
          onChange={handleInputChange}
        />

        <div className="flex items-center gap-4 w-full ">
          <Select required onValueChange={(e: string) => handleBuilding(e)}>
            <SelectTrigger className="w-full h-[4rem] bg-primary-secondary text-primary-color border-4 border-primary-color font-bold rounded-full">
              <SelectValue placeholder="Building.." />
            </SelectTrigger>
            <SelectContent>
              {[...Array(10)].map((_, index) => (
                <SelectItem key={index} value={String(index + 1)}>
                  {index + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-white"
            placeholder="Pen"
            name="pen"
            required
            onChange={handleInputChange}
          />
        </div>

        <Select required onValueChange={(e: string) => handleSelectedFarmer(e)}>
          <SelectTrigger className="w-full h-[4rem] bg-primary-secondary text-primary-color border-4 border-primary-color font-bold rounded-full">
            <SelectValue placeholder="Search farmer.." />
          </SelectTrigger>
          <SelectContent>
            <Input
              onChange={(e) => setSearchFarmer(e.target.value)}
              placeholder="search farmer"
            />

            {farmer
              .filter((farm) => farm.farmer_name.includes(searchFarmer))
              .map((farm, index) => (
                <SelectItem key={index} value={String(farm.farmer_name)}>
                  {farm.farmer_name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <Select required onValueChange={(e: string) => hanldePigType(e)}>
          <SelectTrigger className="w-full h-[4rem] bg-primary-secondary text-primary-color border-4 border-primary-color font-bold rounded-full">
            <SelectValue placeholder="Pig Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sow">Sow</SelectItem>
            <SelectItem value="Boar">Boar</SelectItem>
          </SelectContent>
        </Select>

        <Select required onValueChange={(e: string) => handleSlectedBuff(e)}>
          <SelectTrigger className="w-full h-[4rem] bg-primary-secondary text-primary-color border-4 border-primary-color font-bold rounded-full">
            <SelectValue placeholder="Select Buff" />
          </SelectTrigger>
          <SelectContent>
            <Input
              onChange={(e) => setSearchBuff(e.target.value)}
              placeholder="search buffs"
            />
            {buffs
              .filter((buff) => buff.buff_name.includes(searchBuff))
              .map((buff, index) => (
                <SelectItem key={index} value={String(buff.buff_id)}>
                  {buff.buff_name} - {buff.buff_type}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {pigType === 'Sow' && (
          <div className="flex items-start w-full flex-col">
            <Label className="text-primary-secondary my-2 block">
              Date of Breed
            </Label>
            <Input
              className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-white"
              name="date_breed"
              required
              type="date"
              onChange={handleInputChange}
            />
          </div>
        )}

        <Input
          className="mb-2 border-4 border-primary-secondary p-6 rounded-full placeholder:text-primary-secondary placeholder:text-xl text-white"
          placeholder="Short Description"
          name="short_desc"
          required
          onChange={handleInputChange}
        />

        <div className="flex gap-2 justify-end items-center">
          <Button
            onClick={() => setShowAddPig(!showAddPig)}
            className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4 bg-primary-color text-primary-secondary hover:bg-primary-secondary hover:text-primary-color hover:border-primary-color"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="font-bold text-xl p-6 w-[8rem] transition-all duration-300 ease-in-out hover:border-4  text-primary-color hover:bg-primary-color hover:text-primary-secondary bg-primary-secondary hover:border-primary-secondary"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
