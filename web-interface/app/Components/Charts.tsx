"use client";

const Charts = () => {
    return (
        <div className="mx-auto w-full max-w-3xl">
            <h2 className="pb-5 text-center text-slate-200">Match outcome probabilities</h2>
            <canvas id="prediction_chart"></canvas>
        </div>
    );
}

export default Charts;