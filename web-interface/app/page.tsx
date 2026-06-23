"use client";
import Select from "react-select";
import { countries } from "@Components/Countries";

const options = countries.map((country: string) => ({
    value: country,
    label: country,
}));

export default function Home() {
    return (
        <div>
            <Select
                options={options}
            />
        </div> 
    );
}
