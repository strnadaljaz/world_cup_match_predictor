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
}