describe('Match predictor API', () => {
    test('returns probabilities', async () => {
        const URL = "https://strnadserver.pike-solfege.ts.net/api/probabilities";

        const params = {
            home_team: "argentina",
            away_team: "brazil",
            neutral: false,
        };

        const response = await fetch(
            URL, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json"
            }
        });

        expect(response.status).toBe(200);

        const data = await response.json();

        const probabilities = data.probabilities;
        const explanationData = data.explanation_data;

        expect(probabilities).toHaveProperty("home_win");
        expect(probabilities).toHaveProperty("away_win");
        expect(probabilities).toHaveProperty("draw");

        expect(explanationData).toHaveProperty("home_goal_diff");
        expect(explanationData).toHaveProperty("away_goal_diff");
        expect(explanationData).toHaveProperty("home_form");
        expect(explanationData).toHaveProperty("away_form");
        expect(explanationData).toHaveProperty("home_elo");
        expect(explanationData).toHaveProperty("away_elo");
        expect(explanationData).toHaveProperty("home_fifa_rank");
        expect(explanationData).toHaveProperty("away_fifa_rank");

        expect(typeof probabilities.home_win).toBe("number");
        expect(typeof probabilities.away_win).toBe("number");
        expect(typeof probabilities.draw).toBe("number");

        expect(typeof explanationData.home_goal_diff).toBe("number");
        expect(typeof explanationData.away_goal_diff).toBe("number");
        expect(typeof explanationData.home_form).toBe("object");
        expect(typeof explanationData.away_form).toBe("object");
        expect(typeof explanationData.home_elo).toBe("number");
        expect(typeof explanationData.away_elo).toBe("number");
        expect(typeof explanationData.home_fifa_rank).toBe("string");
        expect(typeof explanationData.away_fifa_rank).toBe("string");
    });
});
