"use client"
import { countries } from "@Components/Countries";
import { useState } from "react";
import { useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function Home() {
    const COLORS = {
        home: "#4CAF50",  // green
        draw: "#FFC107",  // amber
        away: "#2196F3",   // blue
        remainder: "#020617"
    };

    const [formData, setFormData] = useState({
        homeCountry: "",
        awayCountry: "",
        neutral: false,
    });

    const [chartData, setChartData] = useState({
        "home_win": null,
        "draw": null,
        "away_win": null,
    });

    useEffect(() => {
        let charts: Chart[] = [];
        let timers: ReturnType<typeof setTimeout>[] = [];

        function createAnimatedDoughnutChart(
            canvasId: string,
            targetValue: number,
            color: string,
            delay = 0
        ) {
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
            if (!canvas) return;

            const chart = new Chart(canvas, {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            data: [0, 100],
                            backgroundColor: [color, COLORS.remainder],
                            borderColor: "#2B2B3B"
                        }
                    ]
                },
                options: {
                    animation: {
                        duration: 1200,
                        easing: "easeOutQuart",
                    },
                }
            });

            charts.push(chart);

            timers.push(
                setTimeout(() => {
                    chart.data.datasets[0].data = [targetValue, 100 - targetValue];
                    chart.update();
                }, delay)
            );
        }

        if (chartData.home_win != null) {
            createAnimatedDoughnutChart("home_win_chart", chartData.home_win, COLORS.home, 0);
        }

        if (chartData.draw != null) {
            createAnimatedDoughnutChart("draw_chart", chartData.draw, COLORS.draw, 120);
        }

        if (chartData.away_win != null) {
            createAnimatedDoughnutChart("away_win_chart", chartData.away_win, COLORS.away, 240);
        }

        return () => {
            timers.forEach(timer => clearTimeout(timer));
            charts.forEach(chart => chart.destroy());
        }
    }, [chartData]);

    async function SubmitForm() {
        if (formData.homeCountry &&
            formData.awayCountry &&
            (formData.homeCountry != formData.awayCountry)) {
            const params = {
                home_team: formData.homeCountry.toLowerCase(),
                away_team: formData.awayCountry.toLowerCase(),
                neutral: formData.neutral,
            };

            const URL = process.env.NEXT_PUBLIC_LINK || "https://world-cup-match-predictor.onrender.com/probabilities";

            const response = await fetch(
                URL, {
                method: "POST",
                body: JSON.stringify(params),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            data["home_win"] *= 100;
            data["away_win"] *= 100;
            data["draw"] *= 100;
            setChartData(data);
        }
        else if (!formData.homeCountry || !formData.awayCountry) {
            alert("Enter both countries!");
        }
        else if (formData.homeCountry === formData.awayCountry) {
            alert("Home and away are the same!");
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
                            <input
                                list="countries"
                                id="homeCountry"
                                value={formData.homeCountry}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        homeCountry: e.target.value,
                                    })
                                }
                                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
                            ></input>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="awayCountry"
                                className="text-sm font-medium text-slate-200"
                            >
                                Away country
                            </label>
                            <input
                                list="countries"
                                id="awayCountry"
                                value={formData.awayCountry}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        awayCountry: e.target.value,
                                    })
                                }
                                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
                            ></input>
                        </div>

                        <datalist id="countries">
                            {countries.map((country) => (
                                <option value={country} key={country}/>
                            ))}
                        </datalist>

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
                                id="submit_button"
                                onClick={SubmitForm}
                                className="group inline-flex items-center justify-center rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-400 hover:-translate-y-1 hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 cursor-pointer"
                            >
                                Predict match
                            </button>
                        </div>
                    </div>
                </section>
                <section className="pt-4">
                    <p>* Note: predictor can make mistakes. I am not responsible for any miss predictions.</p>
                </section>
                <section className="mt-8 flex-1 rounded-3xl border border-dashed border-white/10 bg-slate-950/30 p-6 text-sm text-slate-400 sm:p-8">
                    {(chartData.home_win != null) &&
                        <div className="columns-3">
                            <div>
                                <h2>Home win</h2>
                                <canvas id="home_win_chart"></canvas>
                            </div>
                            <div>
                                <h2>Draw</h2>
                                <canvas id="draw_chart"></canvas>
                            </div>
                            <div>
                                <h2>Away win</h2>
                                <canvas id="away_win_chart"></canvas>
                            </div>
                        </div>
                    }
                </section>
            </div >
        </main >
    );
}
