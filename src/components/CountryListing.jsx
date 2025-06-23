// import data from "../data.json";

import { Link } from "react-router-dom";



function CountryListing({ country }) {
    return (
        <div className="flex flex-col max-w-[300px] sm:w-75 bg-white dark:bg-[#2b3945] rounded-md shadow-md">
            <Link to={`/details/${country.name.common}`} className="w-full h-50">
                <img src={country.flags.png} alt="Country Flag" className="w-full h-50 object-cover rounded-md shadow-md" />
            </Link>
            <div className="flex flex-col justify-start gap-5 px-4 py-8 h-50">
                <h2 className="text-xl font-bold">{country.name.common}</h2>
                <div className="flex flex-col gap-2">
                    <p className="text-sm"><span className="font-bold">Population:</span> {country.population}</p>
                    <p className="text-sm"><span className="font-bold">Region:</span> {country.region}</p>
                    <p className="text-sm"><span className="font-bold">Capital:</span> {country.capital}</p>

                </div>
            </div>
        </div>
    )
}

export default CountryListing;
