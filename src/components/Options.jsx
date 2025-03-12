import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

export default function Options() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const name = currentUser?.name;
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null);
        navigate("/login");
    };

    return (
        <div className="relative">
            <div className="hidden md:block">
                <div className="flex items-center gap-4">
                    <a href="/my-expenses" className="text-white text-sm hover:underline">My Expenses</a>
                    <a href="/analytics" className="text-white text-sm hover:underline">Analytics</a>
                    <button onClick={handleLogout} className="text-white text-sm hover:underline">Sign out</button>
                </div>
            </div>

            <div className="md:hidden">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
                            {name || "Menu"}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>
                    </div>

                    <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none"
                    >
                        <div className="py-1">
                            <MenuItem>
                                <a
                                    href="/my-expenses"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    My Expenses
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    href="/analytics"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    Analytics
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    onClick={handleLogout}
                                    type="button"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                >
                                    Sign out
                                </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}
