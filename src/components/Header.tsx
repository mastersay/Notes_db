import React from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const nav_data = [{title: "All", href: "/"}, {title: "Subjects", href: "/subjects"}, {title: "About", href: "/about"}]
const Header = () => {
    // noinspection SpellCheckingInspection
    return (
        <div className={"flex items-center justify-between py-10"}>
            <Link href={"/"}>
                <div className={"flex items-center justify-between"}>
                    <div className={"mr-3"}>
                        {/*Logo */}
                    </div>
                    <p className={"h-6 text-2xl font-semibold"}>Notes db</p>
                </div>
            </Link>
            <div className={"flex items-center text-base leading-5"}>
                <div>
                    {nav_data.map((nav_item) => (
                        <Link href={nav_item.href} key={nav_item.title}
                              className={"p-1 font-medium sm:p-4"}>
                            {nav_item.title}
                        </Link>
                    ))}
                </div>

                <ThemeSwitch/>

            </div>
        </div>
    )
}

export default Header