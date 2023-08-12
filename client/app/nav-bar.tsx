"use client";

import LoginButton from "@/components/core/account/login-button";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";




export default function Navbar({ links }: { links: any }) {
    //check if the current one is active 
    const pathname = usePathname();
    
  return (
    <Disclosure as="nav" className="bg-gray-700 shadow m-2 rounded-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
              <div className="flex flex-shrink-0 items-center">

                </div>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {links.map((link: any, index: number) => (
                    <Link
                      key={index}
                      href={link.href}
                      className={`inline-flex items-center border-b-2 
                      ${pathname == link.href ? 'border-green-300':'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-400'}  
                      px-1 pt-1 text-md font-medium text-gray-300`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                 
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Link className="bg-green-300 font-semibold text-sm rounded-md px-3 py-2 text-gray-800 hover:bg-green-200 inline-flex items-center" href="/attestation/create">
                    Create Library
                  </Link>

                {/* Profile dropdown */}
                <div className="relative ml-3">
                    <LoginButton />
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2
                 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-300">
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

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-indigo-50 border-green-300 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {links.map((link: any, index: number) => (
                <Disclosure.Button
                key={index}
                as="a"
                href={link.href}
                className={`block border-l-4  bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium 
                ${pathname.includes(link.href) ? 'border-green-300 text-green-700': 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}  
                `}
              >
                {link.name}
              </Disclosure.Button>
            ))}
            <div className="mt-6 w-full flex justify-center">
                <LoginButton />
            </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
