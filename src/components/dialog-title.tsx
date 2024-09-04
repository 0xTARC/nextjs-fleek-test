import { Dialog } from '@radix-ui/themes'
import { Button } from './button'
import { RxCross1 } from 'react-icons/rx'
import { FC } from 'react'

type DialogTitleProps = {
  dialogTitle: string
  setDialogOpen: React.Dispatch<boolean>
}

export const DialogTitle: FC<DialogTitleProps> = ({ dialogTitle, setDialogOpen }) => {
  return (
    <div className={'flex flex-row items-center justify-between p-2'}>
      <Dialog.Title>
        <p className="pt-4 pl-3 text-color-text-base font-semibold">{dialogTitle}</p>
      </Dialog.Title>
      <Dialog.Close onClick={() => setDialogOpen(false)}>
        <Button variant="flat" className="!border-none">
          <RxCross1 size={20} color="gray" />
        </Button>
      </Dialog.Close>
    </div>
  )
}
