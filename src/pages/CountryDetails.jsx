import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetails() {

    const { country } = useParams();
    const [countryData, setCountryData] = useState([]);
    const [borders, setBorders] = useState([]);
    const [borderCountryNames, setborderCountryNames] = useState([]);

    const endpoint = `https://restcountries.com/v3.1/name/${country}?fullText=true`;

    useEffect(() => {
        axios.get(endpoint)
            .then(response => {
                setCountryData(response.data[0])
                setBorders(response.data[0].borders);
            })
            .catch(error => {
                console.error('There was an error fetching the data! ', error)
            })
            .finally(() => {
                console.log('Successful');
            })
    }, [endpoint]);

    useEffect(() => {
        if (!borders?.length) return;


        // const borderCountries = [];
        const url = `https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}`

        axios.get(url)
            .then(response => {
                setborderCountryNames(response.data.map(e => e.name.common))
            })
            .catch(console.error)
            .finally(
                console.log('Successful')
            )
    }, [borders]);

    useEffect(() => {
        console.log('borders: ', borderCountryNames);
    }, [borderCountryNames]);


    //helpers 

    const getNativeNames = (nameObj) => {
        return nameObj?.nativeName
            ? Object.values(nameObj.nativeName).map((n) => n.common)
            : [];
    }

    const getCurrencies = (currencyObj) => {
        return currencyObj
            ? Object.values(currencyObj).map((c) => c.name)
            : [];
    }

    const getBorderCountries = (borderObj) => {
        return borderObj
            ? Object.values(borderObj).map((c) => c)
            : [];
    }

    // const codes = getBorderCountries(countryData.borders);
    // const codesKeys = codes.join(',')

    // useEffect(() => {

    //     // if (!codesKeys) return;

    //     const url = `https://restcountries.com/v3.1/alpha?codes=${codesKeys.join(',')}`;
    //     axios.get(url)
    //         .then(response => {
    //             setBorders(response.data);
    //         })
    //         .catch(console.error)
    //         .finally(
    //             console.log(borders)
    //         )
    // }, [countryData]);

    // useEffect(() => {
    //     const borderArr = getBorderCountries(countryData.borders);
    //     if (!borderArr.length) console.log('empty');

    //     const url = `https://restcountries.com/v3.1/alpha?codes=${borderArr.join(",")}`;
    //     axios.get(url)
    //         .then(res => setBorders(res.data))
    //         .catch(console.error);
    // }, [countryData.borders]);





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

                                <div className="flex flex-col justify-start text-black dark:text-white gap-3">
                                    {
                                        borderCountryNames.length!=0 && (
                                            <>
                                                <h2 className="font-normal">Border Countries:</h2>
                                                <div className="flex flex-wrap justify-start gap-3">
                                                    {borderCountryNames.map((country, key) => {
                                                        return (
                                                            <div key={key} className="flex justify-center items-center btn w-[100px] h-10  dark:bg-[#2b3945] rounded-sm shadow-xl">
                                                                {country}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        )
                                    }
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