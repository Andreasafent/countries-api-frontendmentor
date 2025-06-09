import SearchBar from "../components/SearchBar";
import Filter from "../components/FIlter";
import data from "../data.json";

function Home() {
    console.log(data[0].flag)
    return (
        <>
            <main className="flex flex-col h-full text-black px-4 py-8 dark:text-white">
                <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-between  items-start ">

                    <SearchBar />

                    <Filter />

                </div>

                <div className="flex gap-5">
                    
                </div>



            </main>

        </>
    )
}

export default Home;