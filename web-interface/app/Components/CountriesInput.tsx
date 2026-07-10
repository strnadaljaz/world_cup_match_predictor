"use client";
import { countriesInputType } from "../lib/types";

const CountriesInput = ({ id, formData, setFormData } : countriesInputType) => {
    return (
        <input
            list="countries"
            id={id}
            value={id == "homeCountry" ? formData.homeCountry : formData.awayCountry}
            onChange={(e) =>
                setFormData({
                    ...formData,
                    [id]: e.target.value,
                })
            }
            className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
        ></input>
    );
}

export default CountriesInput;