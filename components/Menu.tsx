import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MenuAlt2Icon } from "@heroicons/react/outline";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/router";

export default function DropdownMenu() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    await router.push("/");
  };

  return (
    <Menu as="div" className="ml-auto relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <MenuAlt2Icon
            className="w-5 h-5 mr-1 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
          <span className="italic">Menu</span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link href="/polls">
                  <div
                    className={`${
                      active ? "bg-black text-white" : "text-gray-900"
                    } group flex rounded-md items-center w-full px-2 py-2 text-sm italic hover:cursor-pointer`}
                  >
                    My Polls
                  </div>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-black text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm italic hover:cursor-pointer`}
                  onClick={logout}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
