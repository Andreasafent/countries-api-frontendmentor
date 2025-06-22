import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const continents = [
    "Africa",
    "America",
    "Asia",
    "Europe",
    "Oceania"
]


function Filter({ selectedContinent, setSelectedContinent }) {

    const [isShownFilter, setIsShownFilter] = useState(false);

    const handleChange = (continent) => {
        // console.log(`Selected continent: ${continent}`);
        setSelectedContinent(continent);
        localStorage.setItem('filter', selectedContinent);
        setIsShownFilter(false);
    }

    return (
        <div
            className="md:w-50 w-[60%] rounded-md shadow-[0_0_20px_0px_rgba(0,0,0,0.25)] p-3 dark:bg-[#2b3945] relative"
        >
            <div
                className="flex justify-between items-center w-full"
                onClick={() => setIsShownFilter(!isShownFilter)}
            >
                <p className="font-light">{selectedContinent === 'all' ? 'FIlter by Region' : selectedContinent}</p>
                <ChevronDownIcon className="h-3 text-black dark:text-white" />

            </div>

            <div className={"absolute top-full left-0 w-full rounded-md" + (isShownFilter ? " block" : " hidden")}>
                <ul className="bg-white dark:bg-[#2b3945] shadow-lg rounded-md mt-2">
                    {
                        continents.map((continent, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3b4a5c] cursor-pointer"
                                onClick={()=>handleChange(continent)}
                            >
                                {continent}
                            </li>
                        ))
                    }
                    {
                        selectedContinent !== 'all' && (
                            <li
                                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#3b4a5c] cursor-pointer"
                                onClick={() => {
                                    setSelectedContinent('all');
                                    localStorage.removeItem('filter');
                                    setIsShownFilter(false);
                                }}
                            >
                                All
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Filter;