import SearchBar from "../components/SearchBar";
import Filter from "../components/FIlter";
import data from "../data.json";
import CountryListing from "../components/CountryListing";

function Home() {
    console.log(data[0].flag)
    return (
        <>
            <main className="flex flex-col sm:min-w-[80%] h-full text-black px-4 py-8 dark:text-white ">
                <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-between  items-start ">

                    <SearchBar />

                    <Filter />

                </div>

                <div className="flex gap-10 md:justify-between justify-center flex-wrap pt-10">
                    {
                        data.map((_, index, array) => (
                            <CountryListing
                                key={index}
                                index={index}
                                array={array}
                            />
                        ))
                    }
                </div>



            </main>

        </>
    )
}

export default Home;