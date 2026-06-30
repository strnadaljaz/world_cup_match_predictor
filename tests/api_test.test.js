describe('Match predictor API', () => {
    test('returns probabilities', async () => {
        // const URL = "http://127.0.0.1:8000/probabilities";
        const URL = "https://world-cup-match-predictor.onrender.com/probabilities";

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

        expect(data).toHaveProperty("home_win");
        expect(data).toHaveProperty("away_win");
        expect(data).toHaveProperty("draw");

        expect(typeof data["home_win"]).toBe("number");
        expect(typeof data["away_win"]).toBe("number");
        expect(typeof data["draw"]).toBe("number");
    });
});
