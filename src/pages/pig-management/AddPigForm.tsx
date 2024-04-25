import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type AddFieldFomProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showAddPig: boolean
  setShowAddPig: (e: boolean) => void

  handleBuilding: (e: string) => void
}

export default function AddPigForm({
  handleSubmit,
  handleInputChange,
  showAddPig,
  setShowAddPig,

  handleBuilding,
}: AddFieldFomProps) {
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

        <Input
          className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-white"
          placeholder="Assigned Farmer"
          name="assigned_farmer"
          required
          onChange={handleInputChange}
        />
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
