import clsx from 'clsx'
import React, { useMemo, useRef, useState } from 'react'
import { Button } from './button'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useScreenDetector } from '~/hooks/useScreenDetector'
import { Overlay } from '~/components/overlay'
import { IoMdArrowBack } from 'react-icons/io'
import { useOnClickOutside } from 'usehooks-ts'

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
  const parentRef = useRef<HTMLDivElement | null>(null)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isOpenFeeSearchDropdown, setIsOpenFeeSearchDropdown] = useState<boolean>(false)
  const { isMobile } = useScreenDetector()
  useOnClickOutside(parentRef, () => setIsOpenFeeSearchDropdown(false))

  const feeSelectContent = useMemo(() => {
    if (!isOpenFeeSearchDropdown && !isOverlayOpen) return
    const feeTiers = [
      { value: '100', label: '1 bps' },
      { value: '500', label: '5 bps' },
      { value: '3000', label: '30 bps' },
      { value: '10000', label: '100 bps' },
    ]
    return (
      <div
        className={clsx('w-full overflow-y-auto', {
          'max-h-[470px] border shadow-bold-shadow absolute z-10 rounded-lg bg-white': !isMobile,
        })}>
        {feeTiers.map((item, index) => (
          <div
            key={item.value}
            onClick={() => {
              onFeeTierSelect(Number(item.value))
              isMobile ? setIsOverlayOpen(false) : setIsOpenFeeSearchDropdown(false)
            }}
            role="presentation"
            className="flex flex-row items-center gap-x-2 px-2.5 py-3 hover:bg-gray-100">
            <span className="text-lg font-semibold">{item.label}</span>
          </div>
        ))}
      </div>
    )
  }, [isMobile, isOpenFeeSearchDropdown, isOverlayOpen, onFeeTierSelect])

  const selectedFeeButton = useMemo(() => {
    if (selectedFeeTier) {
      return (
        <div className="rounded-lg w-fit relative">
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
              <AiOutlineCloseCircle size={26} />
            </button>
          </div>
        </div>
      )
    }
  }, [onFeeTierSelect, selectedFeeTier])

  if (isMobile) {
    return (
      <div>
        <div>
          <label className="text-md font-normal pb-2">{label}</label>
          <div className="h-[56px] border border-gray-200 w-full px-4 py-2 rounded-lg hover:cursor-text hover:border-gray-400">
            {selectedFeeTier ? (
              selectedFeeButton
            ) : (
              <div className="rounded-lg w-fit relative">
                <div className="flex flex-row items-center gap-x-5 bg-gray-100 rounded-full px-2.5 py-1 shadow-md">
                  <div className="flex flex-row items-center gap-x-1">
                    <span className="text-lg font-bold">Any</span>
                  </div>
                  <button
                    aria-label="Clear selection"
                    id="clear-selection"
                    onClick={(e) => setIsOverlayOpen(!isOverlayOpen)}>
                    <AiOutlineCloseCircle size={26} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <Overlay isOpen={isOverlayOpen}>
          <div className="flex flex-row items-center px-2 pb-4">
            <Button
              variant="flat"
              className="!w-26 !h-26 !p-4 !border-none"
              onClick={() => setIsOverlayOpen(false)}>
              <div className="flex items-center justify-center">
                <IoMdArrowBack size={22} />
              </div>
            </Button>
          </div>
          {feeSelectContent}
        </Overlay>
      </div>
    )
  } else {
    return (
      <div className="relative" ref={parentRef}>
        <label className="text-md font-normal pb-2">{label}</label>
        <div className="h-[56px] border border-gray-200 w-full px-4 py-2 rounded-lg hover:cursor-text hover:border-gray-400">
          {selectedFeeTier ? (
            selectedFeeButton
          ) : (
            <div className="rounded-lg w-fit relative">
              <div className="flex flex-row items-center gap-x-5 bg-gray-100 rounded-full px-2.5 py-1 shadow-md">
                <div className="flex flex-row items-center gap-x-1">
                  <span className="text-lg font-bold">Any</span>
                </div>
                <button
                  aria-label="Clear selection"
                  id="clear-selection"
                  onClick={(e) => setIsOpenFeeSearchDropdown(!isOpenFeeSearchDropdown)}>
                  <AiOutlineCloseCircle size={26} />
                </button>
              </div>
            </div>
          )}
        </div>
        {feeSelectContent}
      </div>
    )
  }
}
