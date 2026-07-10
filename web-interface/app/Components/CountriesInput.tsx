"use client";
import { countriesInputType } from "../lib/types";

const CountriesInput = ({ id, formData, setFormData } : countriesInputType) => {
    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="text-sm font-medium text-slate-200"
            >
                {id == "homeCountry" ? "Home country" : "Away country"}
            </label>
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
        </div>
    );
}

export default CountriesInput;