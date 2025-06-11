import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetails() {

    const { country } = useParams();
    const [countryData, setCountryData] = useState([]);

    const endpoint = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    useEffect(() => {
        axios.get(endpoint)
            .then(response => {
                setCountryData(response.data[0])
            })
            .catch(error => {
                console.error('There was an error fetching the data! ', error)
            })
            .finally(() => {
                console.log('Successful');
            })
    }, []);


    useEffect(() => {
        console.log(countryData)
    }, [countryData]);




    return (
        <div className="flex flex-col justify-start items-start gap-10 w-full h-full">
            <Link to="/">
                <button className="flex justify-between items-center btn w-[100px] h-10 px-4 py-1 dark:bg-[#2b3945] rounded-lg shadow-lg">
                    <ArrowLeftIcon className="w-5 text-black dark:text-white" />

                    <p className="text-black dark:text-white font-light">Back</p>

                </button>
            </Link>
            <div className="flex">
                {
                    countryData.flags ? (
                        <img src={countryData.flags.png} alt={countryData.flags.alt} />

                    ) : (
                        <p>Loading Country Data...</p>
                    )
                }
            </div>
        </div>
    );
}

export default CountryDetails;