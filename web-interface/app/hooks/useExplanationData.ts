import { useState } from "react";
import { explanationDataType } from "../lib/types";

const useExplanationData = () => {
    const [explanationData, setExplanationData] = useState<explanationDataType>({
        home_goal_diff: null,
        away_goal_diff: null,
        home_form: null,
        away_form: null,
        home_elo: null,
        away_elo: null,
        home_fifa_rank: null,
        away_fifa_rank: null, 
    });

    return { explanationData, setExplanationData };
}

export default useExplanationData;