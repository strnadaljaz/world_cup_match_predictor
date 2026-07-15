"use client";

const Charts = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="">
                <h2 className="flex justify-center pb-5">Home win</h2>
                <canvas id="home_win_chart"></canvas>
            </div>
            <div>
                <h2 className="flex justify-center pb-5">Draw</h2>
                <canvas id="draw_chart"></canvas>
            </div>
            <div>
                <h2 className="flex justify-center pb-5">Away win</h2>
                <canvas id="away_win_chart"></canvas>
            </div>
        </div>
    );
}

export default Charts;