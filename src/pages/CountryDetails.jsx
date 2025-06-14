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

    // useEffect(()=>{
    //     console.log(countryData)
    // }, [countryData]);


    //helpers 

    const getNativeNames = (nameObj) =>{
        return nameObj?.nativeName
            ? Object.values(nameObj.nativeName).map((n) => n.common)
            : [];
    }

    const getCurrencies = (currencyObj)=>{
        return currencyObj 
            ? Object.values(currencyObj).map((c)=>c.name)
            : [];
    }

    const getBorderCountries = (borderObj)=>{
        return borderObj
            ? Object.values(borderObj).map((c)=>c)
            : [];
    }
    




    return (
        <div className="flex flex-col justify-start items-start gap-10 w-full h-full px-4 py-8">
            <Link to="/">
                <button className="flex justify-between items-center btn w-[100px] h-10 px-4 py-1 dark:bg-[#2b3945] rounded-sm shadow-xl">
                    <ArrowLeftIcon className="w-5 text-black dark:text-white" />

                    <p className="text-black dark:text-white font-light">Back</p>

                </button>
            </Link>
            <div className="flex justify-center flex-col gap-5 w-full h-full">
                {
                    countryData.flags ? (

                        <>
                            <div className="flex justify-center items-center flex-col gap-5 w-full h-full">
                                <img src={countryData.flags.png} alt={countryData.flags.alt} />
                            </div>

                            <div className="flex flex-col justify-start gap-5">
                                <div className="">
                                    <h1 className="font-bold text-black dark:text-white text-2xl">
                                        {countryData.name.common}
                                    </h1>
                                </div>

                                <div className="flex flex-col justify-start text-black dark:text-white gap-2">
                                    <p className="font-light"><span className="font-normal">Native name: </span>{getNativeNames(countryData.name).join(", ") || "N/A"}</p>
                                    <p className="font-light"><span className="font-normal">Population: </span>{countryData.population}</p>
                                    <p className="font-light"><span className="font-normal">Region: </span>{countryData.region}</p>
                                    <p className="font-light"><span className="font-normal">Sub Region: </span>{countryData.subregion}</p>
                                    <p className="font-light"><span className="font-normal">Capital: </span>{countryData.capital}</p>
                                </div>

                                <div className="flex flex-col justify-start text-black dark:text-white gap-2 mt-6">
                                    <p className="font-light"><span className="font-normal">Top Level Domain: </span>{countryData.tld[0]}</p>
                                    <p className="font-light"><span className="font-normal">Currencies: </span>{getCurrencies(countryData.currencies).join(', ') || "N/A"}</p>
                                </div>

                                <div className="flex flex-col justify-start text-black dark:text-white">
                                    <h2 className="font-normal">Border Countries:</h2>

                                    <div className="flex justify-center items-center btn w-[150px] h-10  dark:bg-[#2b3945] rounded-sm shadow-xl">
                                        {getBorderCountries(countryData.borders.join(' - '))}
                                    </div>
                                </div>
                            </div>






                        </>





                    ) : (
                        <p>Loading Country Data...</p>
                    )
                }
            </div>
        </div>
    );
}

export default CountryDetails;