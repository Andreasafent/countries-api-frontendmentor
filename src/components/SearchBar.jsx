import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


function SearchBar() {
    return (
        <div className="flex  w-full md:max-w-[600px] bg-white dark:bg-[#2b3945] rounded-lg p-3 shadow-[0_0_20px_0px_rgba(0,0,0,0.25)]">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
            <input
                type="text"
                placeholder="Search for a country..."
                className="bg-transparent outline-none flex-grow text-black dark:text-white placeholder-gray-400"
            />
        </div>
    )
}

export default SearchBar;