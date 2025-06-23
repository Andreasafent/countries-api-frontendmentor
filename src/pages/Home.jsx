import SearchBar from "../components/SearchBar";
import Filter from "../components/FIlter";
import CountryListing from "../components/CountryListing";
import axios from 'axios';
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

function Home() {

    let url = 'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags';
    const [countryData, setCountryData] = useState([]);
    const [value, setValue] = useState('');
    const [selectedContinent, setSelectedContinent] = useState(localStorage.getItem('filter') || 'all');


    const debouncedValue = useMemo(() => {
        return debounce(setValue, 500);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (value.length >= 3) {
                    response = await axios.get(`https://restcountries.com/v3.1/name/${value}?fields=name,capital,region,population,flags`);
                    const filtered = selectedContinent !== 'all'
                        ? response.data.filter(c => c.region.toLowerCase() === selectedContinent.toLowerCase())
                        : response.data;
                    setCountryData(filtered);
                } else {
                    const regionURL = selectedContinent !== 'all'
                        ? `https://restcountries.com/v3.1/region/${selectedContinent.toLowerCase()}?fields=name,capital,region,population,flags`
                        : url;
                    response = await axios.get(regionURL);
                    setCountryData(response.data);
                }
            } catch (err) {
                console.error("Fetch error", err);
                setCountryData([]);
            }
        };

        fetchData();
    }, [value, selectedContinent]);


    useEffect(() => {
        return () => {
            debouncedValue.cancel();
        };
    }, [debouncedValue]);

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
                        countryData.length > 0 ? (
                            countryData.map((country, index) => (
                                <CountryListing key={index} country={country} />
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No countries found.</p>
                        )
                    }

                </div>



            </main>

        </>
    )
}

export default Home;