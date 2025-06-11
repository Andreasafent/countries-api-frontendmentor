import SearchBar from "../components/SearchBar";
import Filter from "../components/FIlter";
import CountryListing from "../components/CountryListing";
import axios from 'axios'; // Uncomment if you need to use axios directly in this file
import { useEffect, useState } from "react";

function Home() {

    let url = 'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags';
    const [countryData, setCountryData] = useState([]); // Assuming you have a state management setup like useState or useContext



    useEffect(() => {
        axios.get(url)
            .then(response => {
                setCountryData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            })
            .finally(() => {
                console.log("Fetch attempt completed.");
            });
    }, []);



    return (
        <>
            <main className="flex flex-col max-w-[1280px] sm:min-w-[80%]  h-full text-black px-4 py-8 dark:text-white ">
                <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-between  items-start ">

                    <SearchBar />

                    <Filter />

                </div>

                <div className="flex gap-10 md:justify-between justify-center flex-wrap pt-10">
                    {
                        countryData && (
                            countryData.map((country, index) => (
                                <CountryListing key={index} country={country} />
                            ))
                        )
                    }

                </div>



            </main>

        </>
    )
}

export default Home;