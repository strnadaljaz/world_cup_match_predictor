"use client"
import { useEffect } from "react";
import { Chart } from "chart.js/auto";
import { COLORS } from "./lib/colors";
import { useChartData } from "./hooks/useChartData";
import { useFormData } from "./hooks/useFormData";
import CountriesInput from "./Components/CountriesInput";
import NeutralInput from "./Components/NeutralInput";
import CountriesDatalist from "./Components/CountriesDatalist";
import SubmitButton from "./Components/SumbitButton";
import Charts from "./Components/Charts";
import Header from "./Components/Header";
import useExplanationData from "./hooks/useExplanationData";
import Explanations from "./Components/Explanations";
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
    
    const { chartData, setChartData } = useChartData();
    const { formData, setFormData } = useFormData(); 
    const { explanationData, setExplanationData } = useExplanationData();
    
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
            createAnimatedDoughnutChart("home_win_chart", Math.round(chartData.home_win), COLORS.home, 0);
        }

        if (chartData.draw != null) {
            createAnimatedDoughnutChart("draw_chart", Math.round(chartData.draw), COLORS.draw, 120);
        }

        if (chartData.away_win != null) {
            createAnimatedDoughnutChart("away_win_chart", Math.round(chartData.away_win), COLORS.away, 240);
        }

        return () => {
            timers.forEach(timer => clearTimeout(timer));
            charts.forEach(chart => chart.destroy());
        }
    }, [chartData]); 

    return (
        <>
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_28%),linear-gradient(180deg,#020617_0%,#030712_48%,#020617_100%)] text-slate-100">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-10 lg:px-12">
               <Header /> 

                <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-8">
                    <div className="grid gap-5 md:grid-cols-3">
                        <CountriesInput id="homeCountry" formData={formData} setFormData={setFormData} />                            
                        <CountriesInput id="awayCountry" formData={formData} setFormData={setFormData}/>

                        <CountriesDatalist />

                        <NeutralInput formData={formData} setFormData={setFormData}/>

                        <SubmitButton formData={formData} setChartData={setChartData} setExplanationData={setExplanationData}/>
                    </div>
                </section>
                <section className="pt-4">
                    <p>* Note: predictor can make mistakes. I am not responsible for any miss predictions.</p>
                </section>
                <section className="mt-8 flex-1 rounded-3xl border border-dashed border-white/10 bg-slate-950/30 p-6 text-sm text-slate-400 sm:p-8">
                    {(chartData.home_win != null) &&
                        <Charts /> 
                    }
                </section>
                <section className="mt-8 flex-1 rounded-3xl border border-dashed border-white/10 bg-slate-950/30 p-6 text-sm text-slate-400 sm:p-8">
                    {(explanationData.home_form != null) &&
                        <Explanations explanationData={explanationData}/>
                    }   
                </section>
                <div className="flex justify-center">
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                        <u><a target="_blank" href="https://github.com/strnadaljaz/world_cup_match_predictor">Source code</a></u>
                    </p>
                </div>
            </div >
        </main >
        <Analytics />
        </>
    );
}
