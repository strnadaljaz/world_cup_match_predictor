import { formDataType } from "./types";
import { chartDataType } from "./types";

const SubmitForm = async(formData: formDataType, setChartData: React.Dispatch<React.SetStateAction<chartDataType>>) => {
    if (formData.homeCountry &&
        formData.awayCountry &&
        (formData.homeCountry != formData.awayCountry)) {
        const params = {
            home_team: formData.homeCountry.toLowerCase(),
            away_team: formData.awayCountry.toLowerCase(),
            neutral: formData.neutral,
        };

        const URL = process.env.NEXT_PUBLIC_IP || "https://strnadserver.pike-solfege.ts.net/probabilities";

        const response = await fetch(
            URL, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        data["home_win"] *= 100;
        data["away_win"] *= 100;
        data["draw"] *= 100;
        setChartData(data);
    }
    else if (!formData.homeCountry || !formData.awayCountry) {
        alert("Enter both countries!");
    }
    else if (formData.homeCountry === formData.awayCountry) {
        alert("Home and away are the same!");
    }
}

export default SubmitForm;