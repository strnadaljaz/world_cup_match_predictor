"use client";

const Charts = () => {
    return (
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
    );
}

export default Charts;