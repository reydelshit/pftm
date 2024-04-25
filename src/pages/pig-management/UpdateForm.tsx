import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PigTypes } from '@/entities/types'

type UpdateFromProps = {
  handleUpdateSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  pigUpdateDetails: PigTypes | null
  setShowUpdateFormPig: (e: boolean) => void
}

export default function UpdateForm({
  handleUpdateSubmit,
  handleInputChange,
  pigUpdateDetails,
  setShowUpdateFormPig,
}: UpdateFromProps) {
  return (
    <div className="absolute w-[100%] h-full top-0 z-50 bg-primary-red bg-opacity-90 flex justify-center items-center">
      <div className="w-[80%] flex justify-center gap-4 ml-[-15rem] p-5">
        <form
          onSubmit={handleUpdateSubmit}
          className="w-[50%] bg-primary-yellow p-8 rounded-lg"
        >
          <h1 className="font-bold text-2xl text-primary-red py-4">
            UPDATE SOIL
          </h1>
          <Label className="text-primary-red my-2 block">Pig Tag</Label>
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Pig Tag"
            name="pig_tag"
            onChange={handleInputChange}
            defaultValue={pigUpdateDetails?.pig_tag}
          />

          <Label className="text-primary-red my-2 block">Building</Label>

          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Building"
            name="building"
            onChange={handleInputChange}
            defaultValue={pigUpdateDetails?.building}
          />

          <Label className="text-primary-red my-2 block">Pen</Label>

          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Pen"
            name="pen"
            onChange={handleInputChange}
            defaultValue={pigUpdateDetails?.pen}
          />

          <Label className="text-primary-red my-2 block">Assigned Farmer</Label>

          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Assigned Farmer"
            name="assigned_farmer"
            onChange={handleInputChange}
            defaultValue={pigUpdateDetails?.assigned_farmer}
          />

          <Label className="text-primary-red my-2 block">Pig Type</Label>
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Change Pig Type"
            name="pig_type"
            onChange={handleInputChange}
            defaultValue={pigUpdateDetails?.pig_type}
          />

          <Label className="text-primary-red my-2 block">
            Short Description
          </Label>
          <Input
            className="mb-2 border-4 border-primary-red p-6 rounded-full placeholder:text-primary-red placeholder:text-xl text-primary-red"
            placeholder="Short Description"
            name="short_desc"
            onChange={handleInputChange}
            defaultValue={pigUpdateDetails?.short_desc}
          />

          <div className="flex gap-2 justify-end items-center">
            <Button
              onClick={() => setShowUpdateFormPig(false)}
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
  )
}
