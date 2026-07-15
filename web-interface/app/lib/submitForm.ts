import { formDataType, chartDataType, explanationDataType } from "./types";

const SubmitForm = async(formData: formDataType, setChartData: React.Dispatch<React.SetStateAction<chartDataType>>, setExplanationData: React.Dispatch<React.SetStateAction<explanationDataType>>) => {
    if (formData.homeCountry &&
        formData.awayCountry &&
        (formData.homeCountry != formData.awayCountry)) {
        const params = {
            home_team: formData.homeCountry.toLowerCase(),
            away_team: formData.awayCountry.toLowerCase(),
            neutral: formData.neutral,
        };

        const URL = process.env.NEXT_PUBLIC_IP || "https://strnadserver.pike-solfege.ts.net/api/probabilities";

        const response = await fetch(
            URL, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        let chart_data = data.probabilities;
        let explanation_data = data.explanation_data;

        setExplanationData(explanation_data);

        chart_data.home_win *= 100;
        chart_data.away_win *= 100;
        chart_data.draw *= 100;
        setChartData(chart_data);
        setExplanationData(explanation_data);
    }
    else if (!formData.homeCountry || !formData.awayCountry) {
        alert("Enter both countries!");
    }
    else if (formData.homeCountry === formData.awayCountry) {
        alert("Home and away are the same!");
    }
}

export default SubmitForm;