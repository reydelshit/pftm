import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { MdDelete } from 'react-icons/md'

import { FaPencilAlt } from 'react-icons/fa'

import { PigTypes } from '@/entities/types'

type FieldManagementTableProps = {
  pigData: PigTypes[]
  sortedData: PigTypes[]
  handleUpdateForm: (id: number) => void
  handleDeletePig: (id: number) => void
}
export default function PigManagementTable({
  pigData,
  sortedData,
  handleUpdateForm,
  handleDeletePig,
}: FieldManagementTableProps) {
  return (
    <Table className="w-full ">
      <TableHeader>
        <TableRow className="text-primary-yellow border-b-4 border-primary-yellow">
          <TableHead className="text-primary-yellow text-xl">PIG NO.</TableHead>
          <TableHead className="text-primary-yellow text-xl">
            Building
          </TableHead>
          <TableHead className="text-primary-yellow text-xl">Pen</TableHead>

          <TableHead className="text-primary-yellow text-xl">
            Assigned Farmer
          </TableHead>
          <TableHead className="text-primary-yellow text-xl">
            Created At
          </TableHead>
          <TableHead className="text-primary-yellow text-xl w-[10rem]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-xl ">
        {pigData.length > 0 ? (
          sortedData.map((pig, index) => (
            <TableRow
              key={index}
              className="text-primary-yellow border-b-4 border-primary-yellow"
            >
              {/* <TableCell>{field.field_id}</TableCell> */}
              <TableCell>{pig.pig_tag}</TableCell>
              <TableCell>{pig.building}</TableCell>

              <TableCell>{pig.pen}</TableCell>
              <TableCell>{pig.assigned_farmer}</TableCell>

              <TableCell>{pig.created_at}</TableCell>

              <TableCell className="flex gap-2">
                <FaPencilAlt
                  onClick={() => handleUpdateForm(pig.pig_id)}
                  className="p-2 text-[2.5rem] text-primary-yellow cursor-pointer"
                />

                <MdDelete
                  onClick={() => handleDeletePig(pig.pig_id)}
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
  )
}