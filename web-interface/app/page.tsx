"use client"
import { countries } from "@Components/Countries";
import { useState } from "react";

export default function Home() {
    const [formData, setFormData] = useState({
        homeCountry: "",
        awayCountry: "",
        neutral: false,
    });

    async function SubmitForm() {
        if (formData.homeCountry && formData.awayCountry) {
            const params = {
                home_team: formData.homeCountry.toLowerCase(),
                away_team: formData.awayCountry.toLowerCase(),
                neutral: formData.neutral,
            };

            const URL = "https://world-cup-match-predictor.onrender.com/probabilities";

            const response = await fetch(
                URL, {
                method: "POST",
                body: JSON.stringify(params),
                headers: {
                    "Content-type": "application/json"
                }
            });

            const data = await response.json();
            console.log(data);
        }
    }

    return (
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_28%),linear-gradient(180deg,#020617_0%,#030712_48%,#020617_100%)] text-slate-100">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-10 lg:px-12">
                <div className="max-w-3xl">
                    <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                        AI match predictor
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        International match predictor
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                        Tune the match inputs now. Prediction charts and output
                        will sit below this section later.
                    </p>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                        Model accuracy: <u>59.99%</u>
                    </p>
                </div>

                <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
                    <div className="grid gap-5 md:grid-cols-3">
                        <div className="space-y-2">
                            <label
                                htmlFor="homeCountry"
                                className="text-sm font-medium text-slate-200"
                            >
                                Home country
                            </label>
                            <select
                                id="homeCountry"
                                value={formData.homeCountry}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        homeCountry: e.target.value,
                                    })
                                }
                                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
                            >
                                <option value="">Select a country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="awayCountry"
                                className="text-sm font-medium text-slate-200"
                            >
                                Away country
                            </label>
                            <select
                                id="awayCountry"
                                value={formData.awayCountry}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        awayCountry: e.target.value,
                                    })
                                }
                                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
                            >
                                <option value="">Select a country</option>
                                {countries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="answer"
                                className="text-sm font-medium text-slate-200"
                            >
                                Neutral ground
                            </label>
                            <select
                                id="answer"
                                value={String(formData.neutral)}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        neutral: e.target.value === "true",
                                    })
                                }
                                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="md:col-span-3 flex justify-end pt-2">
                            <button
                                onClick={SubmitForm}
                                className="group inline-flex items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-400 hover:-translate-y-1 hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 cursor-pointer"
                            >
                                <span className="">
                                    Predict match
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="mt-8 flex-1 rounded-3xl border border-dashed border-white/10 bg-slate-950/30 p-6 text-sm text-slate-400 sm:p-8">
                    Charts and prediction output will live here.
                </section>
                <section>
                    <p>* Note: predictor can make mistakes. I am not responsible for any miss predictions.</p>
                </section>
            </div>
        </main>
    );
}
