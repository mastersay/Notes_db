import {useEffect, useState} from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";
import logo from "@/assets/logo/Notes db_logo_light_mode.svg"
import logo_dark from "@/assets/logo/Notes db_logo_dark_mode.svg"
import {useTheme} from 'next-themes'

// Navbar items
const nav_data = [{title: "All notes", href: "/all_notes"}, {title: "Subjects", href: "/subjects"}, {
    title: "About",
    href: "/about"
}]

// Header component to be included in every page
const Header = () => {
    const [navShow, setNavShow] = useState(false)
    const [mounted, setMounted] = useState(false)
    const {theme, resolvedTheme} = useTheme()
    useEffect(() => setMounted(true), [])

    // Mobile version toggle
    function onToggleNav() {
        setNavShow((status) => {
            if (status) {
                document.body.style.overflow = "auto"
            } else {
                document.body.style.overflow = "hidden"
            }
            return !status
        })
    }

    // noinspection SpellCheckingInspection
    return (
        <div className={"flex items-center justify-between py-10"}>
            {/*Link with logo image here*/}
            <Link href={"/"} aria-label={"Notes db"} className={"h-8 flex align-middle"}>
                {mounted && (theme === 'dark' || resolvedTheme === 'dark') ?
                    <Image src={logo_dark} alt={"Notes db logo"}
                           className={"w-auto h-auto"}/> : <Image src={logo} alt={"Notes db logo"} className={"w-auto h-auto"}/>}
            </Link>
            <div className={"flex items-center text-base leading-5"}>
                {/*Navigation links*/}
                <div className={"hidden sm:block"}>
                    {nav_data.map((nav_item) => (
                        <Link href={nav_item.href} key={nav_item.title}
                              className={"p-1 font-medium text-lg sm:p-4 text-gray-900 dark:text-gray-100"}>
                            {nav_item.title}
                        </Link>
                    ))}
                </div>

                {/*Dark mode switch button*/}
                <ThemeSwitch/>

                {/*Mobile navigation will show on small devices, desktop version will be hidden*/}
                <div className="sm:hidden">
                    <button type="button" className="ml-1 mr-1 h-8 w-8 rounded py-1" aria-label="Toggle Menu"
                            onClick={onToggleNav}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="text-gray-900 dark:text-gray-100">
                            <path fillRule="evenodd"
                                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <div
                        className={`fixed top-0 left-0 z-10 h-full w-full transform bg-gray-200 opacity-95 duration-300 
                        ease-in-out dark:bg-gray-800 ${navShow ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex justify-end">
                            <button type="button" className="mr-5 mt-11 h-8 w-8 rounded" aria-label="Toggle Menu"
                                    onClick={onToggleNav}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="text-gray-900 dark:text-gray-100">
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                        <nav className="fixed mt-8 h-full">
                            {/*Side rollout nav*/}
                            {nav_data.map((link) => (
                                <div key={link.title} className="px-12 py-4">
                                    <Link href={link.href}
                                          className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                                          onClick={onToggleNav}>
                                        {link.title}
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header