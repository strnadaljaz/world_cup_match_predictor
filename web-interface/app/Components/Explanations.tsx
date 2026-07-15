import { COLORS } from "../lib/colors";
import { explanationDataType } from "../lib/types";
import TeamStats from "./TeamStats";

type ExplanationsParameters = {
    explanationData: explanationDataType;
};

const Explanations = ({ explanationData }: ExplanationsParameters) => {
    const homeForm = explanationData.home_form ?? [];
    const awayForm = explanationData.away_form ?? [];

    return (
        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-2">
            <TeamStats teamName="Home Team" form={homeForm} goalDiff={explanationData.home_goal_diff} fifaRank={explanationData.home_fifa_rank} elo={explanationData.home_elo}/>           
            <TeamStats teamName="Away Team" form={awayForm} goalDiff={explanationData.away_goal_diff} fifaRank={explanationData.away_fifa_rank} elo={explanationData.away_elo}/>           
        </div>
    );
};

export default Explanations;