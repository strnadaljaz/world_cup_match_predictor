import { chartDataType } from "../lib/types";
import { useState } from "react";

export const useChartData = () => {
    const [chartData, setChartData] = useState<chartDataType>({
        "home_win": null,
        "draw": null,
        "away_win": null,
    });

    return { chartData, setChartData };
}