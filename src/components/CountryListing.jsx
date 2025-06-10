// import data from "../data.json";



function CountryListing( {index, key, array} ) {
    return (
        <div key={key} className="flex flex-col w-full sm:w-75 bg-white dark:bg-[#2b3945] rounded-md shadow-md">
            <img src={array[index].flag} alt="Country Flag" className="w-full h-50 object-cover rounded-md shadow-md" />
            <div className="flex flex-col justify-start gap-5 px-4 py-8 h-50">
                <h2 className="text-xl font-bold">{array[index].name}</h2>
                <div className="flex flex-col gap-2">
                    <p className="text-sm"><span className="font-bold">Population:</span> {array[index].population}</p>
                    <p className="text-sm"><span className="font-bold">Region:</span> {array[index].region}</p>
                    <p className="text-sm"><span className="font-bold">Capital:</span> {array[index].capital}</p>

                </div>
            </div>
        </div>
    )
}

export default CountryListing;
