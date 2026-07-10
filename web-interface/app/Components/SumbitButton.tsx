"use client";
import SubmitForm from "../lib/submitForm";
import { SubmitButtonType } from "../lib/types";

const SubmitButton = ({formData, setChartData}: SubmitButtonType) => {
    return (
        <div className="md:col-span-3 flex justify-end pt-2">
            <button
                id="submit_button"
                onClick={() => {
                    SubmitForm(formData, setChartData);
                }}
                className="group inline-flex items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-400 hover:-translate-y-1 hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 cursor-pointer"
            >
                Predict match
            </button>
        </div>
    );
}

export default SubmitButton;