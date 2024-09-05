import { ReactNode } from 'react'
export const Overlay = ({ isOpen, children }: { isOpen: boolean; children?: ReactNode }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white flex z-50 w-full animate-slide-down">
      <div className="py-4 relative w-full overflow-y-auto flex flex-col">{children}</div>
    </div>
  )
}
