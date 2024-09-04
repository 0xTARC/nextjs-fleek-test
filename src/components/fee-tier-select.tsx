import clsx from 'clsx'
import React, { useMemo, useState } from 'react'
import { RxChevronDown as ChevronDownIcon } from 'react-icons/rx'
import { Dialog } from '@radix-ui/themes'
import { Button } from './button'
import { DialogTitle } from './dialog-title'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Sheet } from 'react-modal-sheet'

export function FeeTierSelect({
  label,
  onFeeTierSelect,
  disabled,
  selectedFeeTier,
}: {
  label: string
  onFeeTierSelect: React.Dispatch<number | undefined>
  disabled?: boolean
  selectedFeeTier?: number
}) {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isOpenMobileFeeSearch, setIsOpenMobileFeeSearch] = useState<boolean>(false)
  const { isMobile } = useScreenDetector()

  const feeSelectContent = useMemo(() => {
    const feeTiers = [
      { value: '100', label: '1 bps' },
      { value: '500', label: '5 bps' },
      { value: '3000', label: '30 bps' },
      { value: '10000', label: '100 bps' },
    ]
    return (
      <>
        <div className="px-5 pb-6">
          {feeTiers.map((item, index) => (
            <div
              key={item.value}
              onClick={() => {
                onFeeTierSelect(Number(item.value))
                isMobile ? setIsOpenMobileFeeSearch(false) : setIsDialogOpen(false)
              }}
              role="presentation"
              className="hover:bg-gray-100 hover:cursor-pointer py-2">
              <span className="text-lg font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
        {/* <div className="h-[700px] overflow-y-scroll py-4">{MainTokenListItems}</div> */}
      </>
    )
  }, [isMobile, onFeeTierSelect])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mainButton = (onClick: any) => {
    return (
      <Button
        className="!px-2 !py-3 !text-md !rounded-lg !border !border-gray-200 w-[200px] h-[48px]"
        onClick={onClick}
        variant="flat">
        <div className="flex flex-row items-center justify-between">
          <p className="font-normal pl-1">Any</p>
          <ChevronDownIcon
            size={22}
            className={clsx('transition-transform duration-200', {
              'rotate-180': isDialogOpen || isOpenMobileFeeSearch,
            })}
          />
        </div>
      </Button>
    )
  }

  const selectedFeeButton = useMemo(() => {
    if (selectedFeeTier) {
      return (
        <div className="px-2 py-1 text-md rounded-lg border border-gray-200 flex flex-row items-center gap-x-3 w-[200px] h-[48px] justify-between">
          <div className="flex flex-row items-center gap-x-5 bg-gray-100 rounded-full px-2.5 py-1 shadow-md">
            <div className="flex flex-row items-center gap-x-1">
              <span className="text-lg font-bold">{selectedFeeTier / 100} bps</span>
            </div>
            <button
              aria-label="Clear selection"
              id="clear-selection"
              onClick={(e) => {
                e.preventDefault()
                onFeeTierSelect(undefined)
              }}>
              <AiOutlineCloseCircle size={22} />
            </button>
          </div>
          <ChevronDownIcon
            size={22}
            className={clsx('transition-transform duration-200', {
              'rotate-180': isDialogOpen,
            })}
          />
        </div>
      )
    }
  }, [isDialogOpen, onFeeTierSelect, selectedFeeTier])

  return (
    <div className="flex flex-col">
      <label className="text-md font-normal pb-2">{label}</label>
      {isMobile ? (
        <>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-end">
              {selectedFeeTier
                ? selectedFeeButton
                : mainButton(() => setIsOpenMobileFeeSearch(true))}
            </div>
          </div>
          <Sheet
            isOpen={isOpenMobileFeeSearch}
            onClose={() => setIsOpenMobileFeeSearch(false)}
            detent="content-height">
            <Sheet.Container>
              <Sheet.Header />
              <Sheet.Content>
                <Sheet.Scroller>
                  <div className="flex flex-row items-center justify-between pb-4 px-4">
                    <p className="text-lg font-semibold">Select a fee tier</p>
                    <Button
                      variant="flat"
                      className="!border-none"
                      onClick={() => setIsOpenMobileFeeSearch(false)}>
                      Close
                    </Button>
                  </div>
                  {feeSelectContent}
                </Sheet.Scroller>
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
          </Sheet>
        </>
      ) : (
        <Dialog.Root open={isDialogOpen}>
          <Dialog.Trigger>
            {selectedFeeTier
              ? selectedFeeButton
              : mainButton(() => {
                  setIsDialogOpen(true)
                })}
          </Dialog.Trigger>
          <Dialog.Content className="!p-0" maxWidth={'500px'}>
            <DialogTitle dialogTitle={'Select a fee tier'} setDialogOpen={setIsDialogOpen} />
            {feeSelectContent}
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  )
}
