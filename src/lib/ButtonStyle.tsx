import { Button } from '@/components/ui/button'

export default function ButtonStyle({
  children,
  onCLick,
}: {
  children: React.ReactNode
  onCLick: () => void
}) {
  return (
    <Button
      onClick={onCLick}
      className=" w-fit h-[3.5rem] font-bold text-[1.5rem] bg-primary-color hover:bg-primary-secondary hover:text-primary-color hover:border-4 hover:border-primary-color"
    >
      {children}
    </Button>
  )
}
