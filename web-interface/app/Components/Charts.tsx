"use client";

import { COLORS } from "../lib/colors";
import { explanationDataType } from "../lib/types";

type ChartsParameters = {
    explanationData: explanationDataType;
}

const getFormColor = (result: Number) => {
    switch (result) {
        case 1:
            return COLORS.win;
        case 0.5:
            return COLORS.draw;
        default:
            return COLORS.lose;
    }
};

const Charts = ({ explanationData }: ChartsParameters) => {
    const homeForm = explanationData.home_form ?? [];
    const awayForm = explanationData.away_form ?? [];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="">
                <h2 className="flex justify-center pb-5">Home win</h2>
                <div className="grid grid-cols-5 gap-1">
                    {
                        homeForm.map((result, index) => (
                            <div key={index} className="w-6 h-6 rounded-md" style={{backgroundColor: getFormColor(result)}}></div> 
                        )) 
                    }
                </div>
                <canvas id="home_win_chart"></canvas>
            </div>
            <div>
                <h2 className="flex justify-center pb-5">Draw</h2>
                <canvas id="draw_chart"></canvas>
            </div>
            <div>
                <h2 className="flex justify-center pb-5">Away win</h2>
                <div className="grid grid-cols-5 gap-1">
                    {
                        awayForm.map((result, index) => (
                            <div key={index} className="w-6 h-6 rounded-md" style={{backgroundColor: getFormColor(result)}}></div> 
                        )) 
                    }
                </div>
                <canvas id="away_win_chart"></canvas>
            </div>
        </div>
    );
}

export default Charts;