"use client";
import { countries } from "../lib/countries";

const CountriesDatalist = () => {
    return (
        <datalist id="countries">
            {countries.map((country) => (
                <option value={country} key={country}/>
            ))}
        </datalist>
    );
}

export default CountriesDatalist;