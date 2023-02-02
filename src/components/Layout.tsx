import React, {ReactElement} from "react";
import Header from "./Header";

// Layout which includes Header component in every page
const Layout = ({children}: { children: ReactElement }) => {
    return (
        <div className={"mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0"}>
            <Header/>
            {children}
        </div>
    )
}
export default Layout