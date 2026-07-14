import React from "react";

export type formDataType = {
    homeCountry: string;
    awayCountry: string;
    neutral: boolean;
};

export type chartDataType = {
    home_win: null | number;
    draw: null | number;
    away_win: null | number;
};

export type countriesInputType = {
    id: string;
    formData: formDataType;
    setFormData: React.Dispatch<React.SetStateAction<formDataType>>;
}

export type NeutralInputType = {
    formData: formDataType;
    setFormData: React.Dispatch<React.SetStateAction<formDataType>>;
};

export type SubmitButtonType = {
    formData: formDataType;
    setChartData: React.Dispatch<React.SetStateAction<chartDataType>>;
    setExplanationData: React.Dispatch<React.SetStateAction<explanationDataType>>;
}

export type explanationDataType = {
    home_goal_diff: null | number;
    away_goal_diff: null | number;
    home_form: null | Array<Number>;
    away_form: null | Array<Number>;
    home_elo: null | number;
    away_elo: null | number;
    home_fifa_rank: null | number;
    away_fifa_rank: null | number; 
}