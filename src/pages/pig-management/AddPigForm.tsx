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
import { AssignedFarmerTypes } from '@/entities/types'
import axios from 'axios'
import { useEffect, useState } from 'react'

type AddFieldFomProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showAddPig: boolean
  setShowAddPig: (e: boolean) => void

  handleBuilding: (e: string) => void
  handleSelectedFarmer: (e: string) => void
  hanldePigType: (e: string) => void
  pigType: string
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
}: AddFieldFomProps) {
  const [farmer, setFarmer] = useState<AssignedFarmerTypes[]>([])
  const [searchFarmer, setSearchFarmer] = useState('')

  const user_id = localStorage.getItem('cmhs_token')

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

  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-[40%] bg-primary-yellow p-4 rounded-lg"
      >
        <h1 className="font-bold text-2xl text-primary-red py-4">ADD PIG</h1>
        <Input
          className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-white"
          placeholder="Pig Tag Number"
          name="pig_tag"
          required
          onChange={handleInputChange}
        />

        <div className="flex items-center gap-4 w-full ">
          <Select required onValueChange={(e: string) => handleBuilding(e)}>
            <SelectTrigger className="w-full h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
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
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-white"
            placeholder="Pen"
            name="pen"
            required
            onChange={handleInputChange}
          />
        </div>

        <Select required onValueChange={(e: string) => handleSelectedFarmer(e)}>
          <SelectTrigger className="w-full h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
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
          <SelectTrigger className="w-full h-[4rem] bg-primary-red text-primary-yellow border-4 border-primary-yellow font-bold rounded-full">
            <SelectValue placeholder="Pig Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sow">Sow</SelectItem>
            <SelectItem value="Boar">Boar</SelectItem>
          </SelectContent>
        </Select>

        {pigType === 'Sow' && (
          <div className="flex items-start w-full flex-col">
            <Label className="text-primary-red my-2 block">Date of Breed</Label>
            <Input
              className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-white"
              name="date_breed"
              required
              type="datetime-local"
              onChange={handleInputChange}
            />
          </div>
        )}

        <Input
          className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-white"
          placeholder="Short Description"
          name="short_desc"
          required
          onChange={handleInputChange}
        />

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
  )
}
