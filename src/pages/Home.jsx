import SearchBar from "../components/SearchBar";
import Filter from "../components/FIlter";
import CountryListing from "../components/CountryListing";
import axios from 'axios';
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

function Home() {

    let url = 'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags';
    const [allCountries, setAllCountries] = useState([]);
    const [countryData, setCountryData] = useState([]);    
    const [value, setValue] = useState('');
    const [selectedContinent, setSelectedContinent] = useState(localStorage.getItem('filter') || 'all');


    const debouncedValue = useMemo(() => {
        return debounce(setValue, 500);
    }, []);


    useEffect(() => {
        if (value?.length === 0 ) {
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
        } else if( value?.length >= 3) {
            console.log("Searching for:", value);
            axios.get(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,region,population,flags`)
                .then(response => {
                    console.log("Search results:", response.data);
                    setCountryData(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the search results!", error);
                });
        }
    }, [value]);


    useEffect(() => {
        return () => {
            debouncedValue.cancel();
        };
    }, [debouncedValue]);


    useEffect(()=>{
        if (selectedContinent !== 'all') {
            axios.get(`https://restcountries.com/v3.1/region/${selectedContinent.toLowerCase()}?fields=name,capital,region,population,flags`)
                .then(response => {
                    setCountryData(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the continent data!", error);
                });
        } else {
            axios.get(url)
                .then(response => {
                    setCountryData(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the data!", error);
                });
        }
        console.log("Selected continent:", selectedContinent);
    },[selectedContinent]);


    return (
        <>
            <main className="flex flex-col max-w-[1280px] sm:min-w-[80%]  h-full text-black px-4 py-8 dark:text-white ">
                <div className="flex flex-col gap-5 sm:flex-row sm:justify-between sm:items-between  items-start ">

                    <SearchBar
                        onSearch={debouncedValue}
                    />

                    <Filter
                        selectedContinent={selectedContinent}
                        setSelectedContinent={setSelectedContinent}
                    />

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