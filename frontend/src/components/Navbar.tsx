import { Menu } from "@headlessui/react";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="px-4 py-2 bg-blue-600 rounded">
          Options
        </Menu.Button>
        <Menu.Items className="absolute mt-2 w-56 bg-white text-black shadow-lg rounded-md">
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${active ? "bg-gray-100" : ""} block px-4 py-2`}
              >
                Profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`${active ? "bg-gray-100" : ""} block px-4 py-2`}
              >
                Settings
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </nav>
  );
}
