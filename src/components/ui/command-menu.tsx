import { NAV_ITEMS } from '@/config/dashboard'
import { Magnifer, Reply } from '@solar-icons/react'
import { Command } from 'cmdk'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <AnimatePresence>
      {open && (
        <Command.Dialog
          open={open}
          onOpenChange={setOpen}
          label="Global Command Menu"
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-xl border border-neutral-100"
          >
            <div className="flex items-center px-4 py-3 border-b border-neutral-100">
              <Magnifer className="w-5 h-5 text-neutral-400 mr-3" />
              <Command.Input
                placeholder="What do you need?"
                className="flex-1 text-base bg-transparent outline-none placeholder:text-neutral-400 text-neutral-900"
              />
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 text-xs font-semibold bg-neutral-100 text-neutral-500 rounded-md border border-neutral-200">
                  ESC
                </kbd>
              </div>
            </div>

            <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2">
              <Command.Empty className="px-4 py-8 text-center text-sm text-neutral-500">
                No results found.
              </Command.Empty>

              <Command.Group
                heading="Navigation"
                className="text-xs font-semibold text-neutral-400 px-2 mb-2 mt-2"
              >
                {NAV_ITEMS.map((item) => (
                  <Command.Item
                    key={item.to}
                    onSelect={() => {
                      navigate(item.to)
                      setOpen(false)
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-neutral-600 rounded-lg cursor-pointer aria-selected:bg-neutral-100 aria-selected:text-neutral-900 transition-colors"
                  >
                    {item.icon && (
                      <item.icon size={20} className="opacity-70" />
                    )}
                    <span>{item.label}</span>
                    {item.permission && (
                      <span className="ml-auto text-[10px] bg-neutral-100 text-neutral-400 px-1.5 py-0.5 rounded">
                        {item.permission}
                      </span>
                    )}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>

            <div className="flex items-center justify-between px-4 py-2 border-t border-neutral-100 bg-neutral-50 text-xs text-neutral-400">
              <div className="flex gap-4">
                <span>Navigation</span>
                <span>Actions</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Select</span>
                <Reply size={12} />
              </div>
            </div>
          </motion.div>
        </Command.Dialog>
      )}
    </AnimatePresence>
  )
}
