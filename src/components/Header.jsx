import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";


function Header(){
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    
    useEffect(()=>{
        
        localStorage.setItem("theme", theme);

        const htmlElement = document.querySelector("html");
        htmlElement.classList.remove("dark", "light");
        htmlElement.classList.add(theme);

    }, [theme]);


    return (
        <div className="h-20 flex justify-between items-center px-4 bg-white shadow-lg dark:bg-[#2b3945]">
            <div className="text-black font-bold dark:text-white">
                <h1>Where in the world?</h1>
            </div>
            <div className="flex justify-center items-center gap-2 text-black font-normal dark:text-white cursor-pointer" onClick={()=> setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <MoonIcon className="h-5" /> : <SunIcon className="h-5" />}
                <p className="">{theme=== 'dark' ? 'Dark' : 'Light'} Mode</p>
            </div>
        </div>
    )
}

export default Header;