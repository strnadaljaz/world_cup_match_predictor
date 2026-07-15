import { COLORS } from "../lib/colors";
import { explanationDataType } from "../lib/types";

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

type ExplanationsParameters = {
    explanationData: explanationDataType;
};

const Explanations = ({ explanationData }: ExplanationsParameters) => {
    const homeForm = explanationData.home_form ?? [];
    const awayForm = explanationData.away_form ?? [];

    return (
        <div className="grid grid-cols-2">
            <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-1 w-50 items-center">
                    {
                        homeForm.map((result, index) => (
                            <div key={index} className="w-6 h-6 rounded-md" style={{backgroundColor: getFormColor(result)}}></div> 
                        )) 
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-1 w-50">
                    {
                        awayForm.map((result, index) => (
                            <div key={index} className="w-6 h-6 rounded-md" style={{backgroundColor: getFormColor(result)}}></div> 
                        )) 
                    }
                </div>
            </div>
        </div>
    );
};

export default Explanations;