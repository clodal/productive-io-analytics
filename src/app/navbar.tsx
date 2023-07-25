'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { routeConfig } from '@/config'

const leftNavigation = [
  { name: 'Sprint Dashboard', href: routeConfig.SPRINT_DASHBOARD },
]
const rightNavigation = [{ name: 'Settings', href: routeConfig.SETTINGS }]
const navigation = [...leftNavigation, ...rightNavigation]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : ''

  const renderDesktopNavigationItem = (item: {
    name: string
    href: string
  }) => (
    <a
      key={item.name}
      href={`${item.href}${queryString}`}
      className={classNames(
        pathname === item.href
          ? 'border-slate-500 dark:border-slate-300 text-gray-900 dark:text-gray-200'
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300',
        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
      )}
      aria-current={pathname === item.href ? 'page' : undefined}
    >
      {item.name}
    </a>
  )

  return (
    <Disclosure as="nav" className="shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <div className="flex h-16 justify-between">
              {/* Left */}
              <div className="flex">
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center">
                  <a href="/">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="text-gray-100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="100%"
                        height="100%"
                        rx="16"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                </div>
                {/* Left Navigation */}
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {leftNavigation.map(renderDesktopNavigationItem)}
                </div>
              </div>

              {/* Right */}
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                {/* Right Navigation */}
                <div className="hidden h-full sm:-my-px sm:flex sm:space-x-8">
                  {rightNavigation.map(renderDesktopNavigationItem)}
                </div>
              </div>

              {/* Mobile Menu Trigger */}
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
