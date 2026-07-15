import { COLORS } from "../lib/colors";

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

const getGoalDiffColor = (goalDiff: number | null) => {
    if (goalDiff == null) return;
    else if (goalDiff == 0)
        return COLORS.draw;
    else if (goalDiff > 0)
        return COLORS.win;
    else 
        return COLORS.lose;
};

type TeamStatsParameters = {
    teamName: string;
    form: Array<Number>;
    goalDiff: number | null;
    fifaRank: number | null;
    elo: number | null;
}

const TeamStats = ({ teamName, form, goalDiff, fifaRank, elo }: TeamStatsParameters) => {
    return (
        <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <h1 className="text-xl font-semibold text-white">
                {teamName}
            </h1>
            <div className="space-y-4">
                <div className="space-y-2">
                    <h2 className="text-sm font-medium tracking-wide text-slate-300">Form: </h2>
                    <div className="grid w-fit grid-cols-5 items-center gap-2">
                        {form.map((result, index) => (
                            <div
                                key={index}
                                className="h-6 w-6 rounded-md ring-1 ring-white/20"
                                style={{ backgroundColor: getFormColor(result) }}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
                    <h2 className="text-sm font-medium text-slate-300">Goal difference: </h2>
                    <div>
                        <p className="text-sm font-semibold" style={{ color: getGoalDiffColor(goalDiff) }}>{goalDiff}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
                    <h2 className="text-sm font-medium text-slate-300">Fifa rank: </h2>
                    <div>
                        <p className="text-sm font-semibold text-white">{fifaRank}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
                    <h2 className="text-sm font-medium text-slate-300">Elo: </h2>
                    <div>
                        <p className="text-sm font-semibold text-white">{elo}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamStats;